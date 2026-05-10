import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "hono/cookie";
import type { GitkutConfig } from "./config.js";
import {
  exchangeCodeForToken,
  fetchGitHubUser,
  fetchRecentPublicRepos,
} from "./github.js";

type AppVariables = {
  config: GitkutConfig;
};

const TOKEN_COOKIE = "gitkut_github_token";
const STATE_COOKIE = "gitkut_oauth_state";

export function createApp(config: GitkutConfig) {
  const app = new Hono<{ Variables: AppVariables }>();

  app.use("*", async (c, next) => {
    c.set("config", config);
    await next();
  });

  app.use(
    "*",
    cors({
      origin: config.webOrigin,
      credentials: true,
    }),
  );

  app.get("/", (c) => {
    return c.json({
      name: "Gitkut API",
      routes: ["/auth/github", "/auth/github/callback", "/api/me", "/api/repos"],
    });
  });

  app.get("/auth/github", (c) => {
    const appConfig = c.get("config");

    if (!appConfig.githubClientId) {
      return c.json(
        { error: "Configure GITHUB_CLIENT_ID no arquivo api/.env." },
        500,
      );
    }

    const state = crypto.randomUUID();
    const loginUrl = new URL("https://github.com/login/oauth/authorize");
    loginUrl.searchParams.set("client_id", appConfig.githubClientId);
    loginUrl.searchParams.set("redirect_uri", appConfig.githubRedirectUri);
    loginUrl.searchParams.set("scope", "read:user");
    loginUrl.searchParams.set("state", state);

    setCookie(c, STATE_COOKIE, state, {
      httpOnly: true,
      sameSite: "Lax",
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
          error:
            "Configure GITHUB_CLIENT_ID e GITHUB_CLIENT_SECRET no arquivo api/.env.",
        },
        500,
      );
    }

    if (!code) {
      return c.json({ error: "Callback sem parametro code." }, 400);
    }

    if (!returnedState || !storedState || returnedState !== storedState) {
      return c.json({ error: "Estado OAuth invalido ou expirado." }, 400);
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
          error: "Nao foi possivel obter o access_token do GitHub.",
          details: tokenResponse.error_description ?? tokenResponse.error,
        },
        502,
      );
    }

    await fetchGitHubUser(tokenResponse.access_token);

    setCookie(c, TOKEN_COOKIE, tokenResponse.access_token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: appConfig.cookieSecure,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    deleteCookie(c, STATE_COOKIE, {
      path: "/",
    });

    return c.redirect(`${appConfig.webOrigin}/?login=success`);
  });

  app.get("/api/me", async (c) => {
    const token = getCookie(c, TOKEN_COOKIE);

    if (!token) {
      return c.json({ error: "Usuario nao autenticado." }, 401);
    }

    const user = await fetchGitHubUser(token);

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
    });
  });

  app.get("/api/repos", async (c) => {
    const token = getCookie(c, TOKEN_COOKIE);

    if (!token) {
      return c.json({ error: "Usuario nao autenticado." }, 401);
    }

    const repos = await fetchRecentPublicRepos(token);

    return c.json(
      repos.map((repo) => ({
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
      })),
    );
  });

  return app;
}

