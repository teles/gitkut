export type GitkutUser = {
  id: number;
  username: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
};

export type GitkutRepo = {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  isFork: boolean;
  updatedAt: string;
};

export type GitkutScrap = {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatarUrl: string | null;
  message: string;
  createdAt: string;
};

export type GitkutCommunity = {
  id: string;
  name: string;
  slug: string;
  members: number;
  description: string;
};

export type GitkutBadge = {
  id: string;
  label: string;
  description: string;
  tone: "pink" | "blue" | "yellow" | "gray";
};
