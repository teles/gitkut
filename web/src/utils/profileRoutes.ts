const RESERVED_PUBLIC_ROUTES = new Set([
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

export function getPublicProfileSlugFromPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length !== 1) {
    return null;
  }

  const slug = normalizeProfileSlug(parts[0]);

  if (!slug || RESERVED_PUBLIC_ROUTES.has(slug)) {
    return null;
  }

  return slug;
}

function normalizeProfileSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
