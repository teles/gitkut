import type { GitkutRepo, GitkutUser } from "../types/gitkut";

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatGitkutDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function getYearFromDate(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return String(date.getUTCFullYear());
}

export function getDisplayName(user: GitkutUser): string {
  return user.name?.trim() || user.username;
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function getPrimaryLanguage(repos: GitkutRepo[]): string | null {
  const counts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) {
      return acc;
    }

    acc[repo.language] = (acc[repo.language] ?? 0) + 1;
    return acc;
  }, {});

  return (
    Object.entries(counts).sort(([, left], [, right]) => right - left)[0]?.[0] ?? null
  );
}

export function getTotalStars(repos: GitkutRepo[]): number {
  return repos.reduce((total, repo) => total + repo.stars, 0);
}

export function getTotalForks(repos: GitkutRepo[]): number {
  return repos.reduce((total, repo) => total + repo.forks, 0);
}
