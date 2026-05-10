import type { GitkutCommunity } from "../../types/gitkut";

export const gitkutCommunitiesFixture: GitkutCommunity[] = [
  {
    id: "typescript",
    name: "TypeScript Garden",
    slug: "typescript",
    members: 1280,
    description: "Types, tooling, and tiny compiler mysteries.",
  },
  {
    id: "frontend",
    name: "Frontend Cafe",
    slug: "frontend",
    members: 934,
    description: "UI craft, browser quirks, and CSS comfort food.",
  },
  {
    id: "opensource",
    name: "Open Source Club",
    slug: "open-source",
    members: 2104,
    description: "Maintainers, contributors, and issue triage therapy.",
  },
  {
    id: "retro-web",
    name: "Retro Web Lab",
    slug: "retro-web",
    members: 512,
    description: "Marquees are banned, nostalgia is not.",
  },
];
