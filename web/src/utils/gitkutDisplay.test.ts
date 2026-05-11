import { describe, expect, it } from "vitest";
import type { GitkutRepo, GitkutUser } from "../types/gitkut";
import {
  formatGitkutDate,
  getDisplayName,
  getInitials,
  getPrimaryLanguage,
  getTotalForks,
  getTotalStars,
  getYearFromDate,
} from "./gitkutDisplay";

const user: GitkutUser = {
  id: 762639,
  username: "teles",
  name: "Teles",
  avatarUrl: "https://avatars.githubusercontent.com/u/762639?v=4",
  url: "https://github.com/teles",
  bio: "Software Engineer / Frontend Developer",
  followers: 196,
  following: 97,
  publicRepos: 121,
  githubCreatedAt: "2011-05-04T19:38:47Z",
};

const repos: GitkutRepo[] = [
  {
    id: 1,
    name: "gitkut",
    fullName: "teles/gitkut",
    url: "https://github.com/teles/gitkut",
    description: null,
    language: "TypeScript",
    stars: 4,
    forks: 1,
    isFork: false,
    updatedAt: "2026-05-10T08:16:53Z",
  },
  {
    id: 2,
    name: "visual-csp",
    fullName: "teles/visual-csp",
    url: "https://github.com/teles/visual-csp",
    description: null,
    language: "TypeScript",
    stars: 8,
    forks: 2,
    isFork: false,
    updatedAt: "2026-05-03T22:55:59Z",
  },
  {
    id: 3,
    name: "array-mixer",
    fullName: "teles/array-mixer",
    url: "https://github.com/teles/array-mixer",
    description: null,
    language: "HTML",
    stars: 42,
    forks: 77,
    isFork: false,
    updatedAt: "2026-05-03T15:18:02Z",
  },
];

describe("gitkut display helpers", () => {
  it("formats profile identity", () => {
    expect(getDisplayName(user)).toBe("Teles");
    expect(getDisplayName({ ...user, name: "  " })).toBe("teles");
    expect(getInitials("Mayra Codes")).toBe("MC");
  });

  it("formats dates and extracts GitHub account years", () => {
    expect(formatGitkutDate("2026-05-10T12:00:00Z")).toBe("May 10, 2026");
    expect(getYearFromDate(user.githubCreatedAt)).toBe("2011");
    expect(getYearFromDate("not-a-date")).toBeNull();
  });

  it("summarizes repository stats", () => {
    expect(getPrimaryLanguage(repos)).toBe("TypeScript");
    expect(getTotalStars(repos)).toBe(54);
    expect(getTotalForks(repos)).toBe(80);
  });

  it("returns no primary language when repos have no language", () => {
    expect(
      getPrimaryLanguage(repos.map((repo) => ({ ...repo, language: null }))),
    ).toBeNull();
  });
});
