export type GitkutConfig = {
  githubClientId: string;
  githubClientSecret: string;
  githubRedirectUri: string;
  webOrigin: string;
  cookieSecure: boolean;
  cookieSameSite: "Lax" | "None";
};

export type WorkerBindings = {
  DB?: D1Database;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GITHUB_CALLBACK_URL?: string;
  FRONTEND_URL?: string;
  COOKIE_SECURE?: string;
  COOKIE_SAME_SITE?: string;
};

const DEFAULT_REDIRECT_URI = "http://localhost:8787/auth/github/callback";
const DEFAULT_WEB_ORIGIN = "http://localhost:5173";

export function configFromRecord(env: WorkerBindings): GitkutConfig {
  const webOrigin = env.FRONTEND_URL ?? DEFAULT_WEB_ORIGIN;

  return {
    githubClientId: env.GITHUB_CLIENT_ID ?? "",
    githubClientSecret: env.GITHUB_CLIENT_SECRET ?? "",
    githubRedirectUri: env.GITHUB_CALLBACK_URL ?? DEFAULT_REDIRECT_URI,
    webOrigin,
    cookieSecure:
      env.COOKIE_SECURE === undefined
        ? shouldUseSecureCookies(webOrigin)
        : env.COOKIE_SECURE === "true",
    cookieSameSite: env.COOKIE_SAME_SITE === "None" ? "None" : "Lax",
  };
}

function shouldUseSecureCookies(webOrigin: string): boolean {
  try {
    const hostname = new URL(webOrigin).hostname;
    return hostname !== "localhost" && hostname !== "127.0.0.1";
  } catch {
    return true;
  }
}
