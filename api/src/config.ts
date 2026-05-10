export type GitkutConfig = {
  githubClientId: string;
  githubClientSecret: string;
  githubRedirectUri: string;
  webOrigin: string;
  port: number;
  cookieSecure: boolean;
};

const DEFAULT_REDIRECT_URI = "http://localhost:8787/auth/github/callback";
const DEFAULT_WEB_ORIGIN = "http://localhost:5173";
const DEFAULT_PORT = 8787;

export function configFromRecord(
  env: Record<string, string | undefined>,
): GitkutConfig {
  return {
    githubClientId: env.GITHUB_CLIENT_ID ?? "",
    githubClientSecret: env.GITHUB_CLIENT_SECRET ?? "",
    githubRedirectUri: env.GITHUB_REDIRECT_URI ?? DEFAULT_REDIRECT_URI,
    webOrigin: env.WEB_ORIGIN ?? DEFAULT_WEB_ORIGIN,
    port: Number(env.PORT ?? DEFAULT_PORT),
    cookieSecure: env.COOKIE_SECURE === "true",
  };
}

export function nodeConfig(): GitkutConfig {
  return configFromRecord(process.env);
}

