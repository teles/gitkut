const RESERVED_PROFILE_SLUGS = new Set([
  "about",
  "admin",
  "api",
  "app",
  "assets",
  "auth",
  "blog",
  "communities",
  "community",
  "contact",
  "dashboard",
  "docs",
  "explore",
  "favicon.ico",
  "help",
  "home",
  "login",
  "logout",
  "new",
  "notifications",
  "pricing",
  "privacy",
  "profile",
  "profiles",
  "repos",
  "repositories",
  "scrapbook",
  "search",
  "settings",
  "signup",
  "support",
  "terms",
  "users",
]);

export function normalizeProfileSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isReservedProfileSlug(value: string): boolean {
  return RESERVED_PROFILE_SLUGS.has(normalizeProfileSlug(value));
}

export function profileSlugFromGitHubUsername(username: string): string {
  const slug = normalizeProfileSlug(username);

  if (!slug) {
    return `user-${crypto.randomUUID()}`;
  }

  return isReservedProfileSlug(slug) ? `${slug}-dev` : slug;
}
