import { Hono } from "hono";
import { cors } from "hono/cors";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { GitkutConfig, WorkerBindings } from "./config.js";
import {
  findGitkutProfileByGitHubId,
  findPublicGitkutProfileBySlug,
  syncGitHubUserWithD1,
} from "./database.js";
import {
  exchangeCodeForToken,
  fetchGitHubUser,
  fetchPublicReposByUsername,
  fetchRecentPublicRepos,
  type GitHubRepo,
} from "./github.js";
import { isReservedProfileSlug, normalizeProfileSlug } from "./slugs.js";

type AppVariables = {
  config: GitkutConfig;
};

const TOKEN_COOKIE = "gitkut_github_token";
const STATE_COOKIE = "gitkut_oauth_state";

export function createApp(config: GitkutConfig) {
  const app = new Hono<{
    Bindings: WorkerBindings;
    Variables: AppVariables;
  }>();

  app.use("*", async (c, next) => {
    c.set("config", config);
    await next();
  });

  app.use(
    "*",
    cors({
      origin: (origin) => {
        return config.corsAllowedOrigins.includes(origin) ? origin : null;
      },
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "OPTIONS"],
      maxAge: 600,
    }),
  );

  app.get("/health", (c) => {
    return c.json({ ok: true });
  });

  app.get("/", (c) => {
    return c.json({
      name: "Gitkut API",
      runtime: "cloudflare-worker",
      routes: [
        "/health",
        "/auth/github",
        "/auth/github/callback",
        "/auth/logout",
        "/api/me",
        "/api/profile",
        "/api/profiles/:slug",
        "/api/repos",
      ],
    });
  });

  app.get("/auth/github", (c) => {
    const appConfig = c.get("config");

    if (!appConfig.githubClientId) {
      return c.json({ error: "Configure GITHUB_CLIENT_ID in api/.env." }, 500);
    }

    const state = crypto.randomUUID();
    const loginUrl = new URL("https://github.com/login/oauth/authorize");
    loginUrl.searchParams.set("client_id", appConfig.githubClientId);
    loginUrl.searchParams.set("redirect_uri", appConfig.githubRedirectUri);
    loginUrl.searchParams.set("scope", "read:user");
    loginUrl.searchParams.set("state", state);

    setCookie(c, STATE_COOKIE, state, {
      httpOnly: true,
      sameSite: appConfig.cookieSameSite,
      secure: appConfig.cookieSecure,
      path: "/",
      maxAge: 10 * 60,
    });

    return c.redirect(loginUrl.toString());
  });

  app.get("/auth/github/callback", async (c) => {
    const appConfig = c.get("config");
    const code = c.req.query("code");
    const returnedState = c.req.query("state");
    const storedState = getCookie(c, STATE_COOKIE);
    const oauthError = c.req.query("error");

    if (oauthError) {
      return c.redirect(`${appConfig.webOrigin}/?login=error`);
    }

    if (!appConfig.githubClientId || !appConfig.githubClientSecret) {
      return c.json(
        {
          error: "Configure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in api/.env.",
        },
        500,
      );
    }

    if (!code) {
      return c.json({ error: "Callback is missing the code parameter." }, 400);
    }

    if (!returnedState || !storedState || returnedState !== storedState) {
      return c.json({ error: "OAuth state is invalid or expired." }, 400);
    }

    const tokenResponse = await exchangeCodeForToken({
      clientId: appConfig.githubClientId,
      clientSecret: appConfig.githubClientSecret,
      code,
      redirectUri: appConfig.githubRedirectUri,
    });

    if (!tokenResponse.access_token) {
      return c.json(
        {
          error: "Could not get an access token from GitHub.",
          details: tokenResponse.error_description ?? tokenResponse.error,
        },
        502,
      );
    }

    const githubUser = await fetchGitHubUser(tokenResponse.access_token);

    try {
      await syncGitHubUserWithD1(c.env.DB, githubUser);
    } catch (cause) {
      console.error("Failed to sync Gitkut profile in D1.", cause);
    }

    setCookie(c, TOKEN_COOKIE, tokenResponse.access_token, {
      httpOnly: true,
      sameSite: appConfig.cookieSameSite,
      secure: appConfig.cookieSecure,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    deleteCookie(c, STATE_COOKIE, {
      path: "/",
    });

    return c.redirect(`${appConfig.webOrigin}/dashboard?login=success`);
  });

  app.post("/auth/logout", (c) => {
    deleteCookie(c, TOKEN_COOKIE, {
      path: "/",
    });

    return c.json({ ok: true });
  });

  app.get("/api/me", async (c) => {
    const token = getCookie(c, TOKEN_COOKIE);

    if (!token) {
      return c.json({ error: "User is not authenticated." }, 401);
    }

    const user = await fetchGitHubUser(token);

    try {
      await syncGitHubUserWithD1(c.env.DB, user);
    } catch (cause) {
      console.error("Failed to sync Gitkut profile in D1.", cause);
    }

    return c.json({
      id: user.id,
      username: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      url: user.html_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      githubCreatedAt: user.created_at,
    });
  });

  app.get("/api/profile", async (c) => {
    const token = getCookie(c, TOKEN_COOKIE);

    if (!token) {
      return c.json({ error: "User is not authenticated." }, 401);
    }

    if (!c.env.DB) {
      return c.json({ error: "D1 database is not configured." }, 500);
    }

    const user = await fetchGitHubUser(token);
    await syncGitHubUserWithD1(c.env.DB, user);

    const profile = await findGitkutProfileByGitHubId(c.env.DB, user.id);

    if (!profile) {
      return c.json({ error: "Gitkut profile was not found." }, 404);
    }

    return c.json(profile);
  });

  app.get("/api/profiles/:slug", async (c) => {
    const slug = normalizeProfileSlug(c.req.param("slug"));

    if (!slug || isReservedProfileSlug(slug)) {
      return c.json({ error: "Public profile was not found." }, 404);
    }

    if (!c.env.DB) {
      return c.json({ error: "D1 database is not configured." }, 500);
    }

    const profile = await findPublicGitkutProfileBySlug(c.env.DB, slug);

    if (!profile) {
      return c.json({ error: "Public profile was not found." }, 404);
    }

    const repos = await fetchPublicReposByUsername(profile.username);

    return c.json({
      profile: {
        slug: profile.slug,
        displayName: profile.displayName,
        gitkutBio: profile.gitkutBio,
        mood: profile.mood,
        currentlyHackingOn: profile.currentlyHackingOn,
        theme: profile.theme,
        isPublic: profile.isPublic,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
      user: {
        id: profile.githubId,
        username: profile.username,
        name: profile.displayName ?? profile.name,
        avatarUrl: profile.avatarUrl,
        url: profile.githubUrl,
        bio: profile.gitkutBio ?? profile.githubBio,
        followers: profile.followers,
        following: profile.following,
        publicRepos: profile.publicRepos,
        githubCreatedAt: profile.githubCreatedAt,
      },
      repos: repos.map(serializeRepo),
    });
  });

  app.get("/api/repos", async (c) => {
    const token = getCookie(c, TOKEN_COOKIE);

    if (!token) {
      return c.json({ error: "User is not authenticated." }, 401);
    }

    const repos = await fetchRecentPublicRepos(token);

    return c.json(repos.map(serializeRepo));
  });

  return app;
}

function serializeRepo(repo: GitHubRepo) {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isFork: repo.fork,
    updatedAt: repo.updated_at,
  };
}
