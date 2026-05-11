import { describe, expect, it, vi } from "vitest";
import {
  isReservedProfileSlug,
  normalizeProfileSlug,
  profileSlugFromGitHubUsername,
} from "./slugs";

describe("profile slugs", () => {
  it("normalizes GitHub-like usernames into public profile slugs", () => {
    expect(normalizeProfileSlug("Teles")).toBe("teles");
    expect(normalizeProfileSlug("Teles Dev")).toBe("teles-dev");
    expect(normalizeProfileSlug("---Gitkut!!!Profile---")).toBe("gitkut-profile");
  });

  it("keeps reserved product routes away from public profiles", () => {
    expect(isReservedProfileSlug("api")).toBe(true);
    expect(isReservedProfileSlug("Settings")).toBe(true);
    expect(isReservedProfileSlug("teles")).toBe(false);
    expect(profileSlugFromGitHubUsername("api")).toBe("api-dev");
  });

  it("falls back to a generated user slug when the username has no slug parts", () => {
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      "00000000-0000-4000-8000-000000000000",
    );

    expect(profileSlugFromGitHubUsername("!!!")).toBe(
      "user-00000000-0000-4000-8000-000000000000",
    );
  });
});
