import { describe, expect, it } from "vitest";
import { getPublicProfileSlugFromPath } from "./profileRoutes";

describe("getPublicProfileSlugFromPath", () => {
  it("extracts a normalized slug from single-segment profile paths", () => {
    expect(getPublicProfileSlugFromPath("/teles")).toBe("teles");
    expect(getPublicProfileSlugFromPath("/Teles Dev/")).toBe("teles-dev");
  });

  it("rejects product routes and nested paths", () => {
    expect(getPublicProfileSlugFromPath("/api")).toBeNull();
    expect(getPublicProfileSlugFromPath("/settings")).toBeNull();
    expect(getPublicProfileSlugFromPath("/teles/repos")).toBeNull();
    expect(getPublicProfileSlugFromPath("/")).toBeNull();
  });
});
