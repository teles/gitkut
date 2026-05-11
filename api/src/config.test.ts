import { describe, expect, it } from "vitest";
import { configFromRecord } from "./config";

describe("configFromRecord", () => {
  it("uses local defaults when env values are missing", () => {
    const config = configFromRecord({});

    expect(config.githubClientId).toBe("");
    expect(config.githubClientSecret).toBe("");
    expect(config.githubRedirectUri).toBe("http://localhost:8787/auth/github/callback");
    expect(config.webOrigin).toBe("http://localhost:5173");
    expect(config.cookieSecure).toBe(false);
    expect(config.cookieSameSite).toBe("Lax");
    expect(config.corsAllowedOrigins).toContain("http://localhost:5173");
    expect(config.corsAllowedOrigins).toContain("http://127.0.0.1:5173");
  });

  it("normalizes configured CORS origins and removes duplicates", () => {
    const config = configFromRecord({
      FRONTEND_URL: "https://gitkut.com/some-path",
      CORS_ALLOWED_ORIGINS:
        "https://www.gitkut.com/profile, https://gitkut.com, not-a-url",
    });

    expect(config.webOrigin).toBe("https://gitkut.com/some-path");
    expect(config.corsAllowedOrigins).toEqual([
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://gitkut.com",
      "https://www.gitkut.com",
    ]);
    expect(config.cookieSecure).toBe(true);
  });

  it("lets explicit cookie settings override inferred production defaults", () => {
    const config = configFromRecord({
      FRONTEND_URL: "https://gitkut.com",
      COOKIE_SECURE: "false",
      COOKIE_SAME_SITE: "None",
    });

    expect(config.cookieSecure).toBe(false);
    expect(config.cookieSameSite).toBe("None");
  });
});
