export type GitkutConfig = {
  githubClientId: string;
  githubClientSecret: string;
  githubRedirectUri: string;
  webOrigin: string;
  corsAllowedOrigins: string[];
  cookieSecure: boolean;
  cookieSameSite: "Lax" | "None";
};

export type WorkerBindings = {
  DB?: D1Database;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GITHUB_CALLBACK_URL?: string;
  FRONTEND_URL?: string;
  CORS_ALLOWED_ORIGINS?: string;
  COOKIE_SECURE?: string;
  COOKIE_SAME_SITE?: string;
};

const DEFAULT_REDIRECT_URI = "http://localhost:8787/auth/github/callback";
const DEFAULT_WEB_ORIGIN = "http://localhost:5173";
const LOCAL_WEB_ORIGINS = [
  DEFAULT_WEB_ORIGIN,
  "http://127.0.0.1:5173",
];

export function configFromRecord(env: WorkerBindings): GitkutConfig {
  const webOrigin = env.FRONTEND_URL ?? DEFAULT_WEB_ORIGIN;
  const corsAllowedOrigins = uniqueOrigins([
    ...LOCAL_WEB_ORIGINS,
    webOrigin,
    ...parseOriginList(env.CORS_ALLOWED_ORIGINS),
  ]);

  return {
    githubClientId: env.GITHUB_CLIENT_ID ?? "",
    githubClientSecret: env.GITHUB_CLIENT_SECRET ?? "",
    githubRedirectUri: env.GITHUB_CALLBACK_URL ?? DEFAULT_REDIRECT_URI,
    webOrigin,
    corsAllowedOrigins,
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

function parseOriginList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function uniqueOrigins(origins: string[]): string[] {
  return [...new Set(origins.map(normalizeOrigin).filter(Boolean))];
}

function normalizeOrigin(origin: string): string {
  try {
    return new URL(origin).origin;
  } catch {
    return "";
  }
}
