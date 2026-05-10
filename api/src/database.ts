import type { GitHubUser } from "./github.js";

export type GitkutProfileRecord = {
  userId: string;
  githubId: number;
  username: string;
  name: string | null;
  avatarUrl: string;
  githubUrl: string;
  githubBio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  githubCreatedAt: string;
  slug: string;
  displayName: string | null;
  gitkutBio: string | null;
  mood: string;
  currentlyHackingOn: string | null;
  theme: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

type GitkutProfileRow = {
  user_id: string;
  github_id: number;
  username: string;
  name: string | null;
  avatar_url: string;
  github_url: string;
  github_bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  github_created_at: string;
  slug: string;
  display_name: string | null;
  gitkut_bio: string | null;
  mood: string;
  currently_hacking_on: string | null;
  theme: string;
  is_public: number;
  profile_created_at: string;
  profile_updated_at: string;
  last_login_at: string | null;
};

export async function syncGitHubUserWithD1(
  db: D1Database | undefined,
  user: GitHubUser,
): Promise<void> {
  if (!db) {
    return;
  }

  const now = new Date().toISOString();
  const userId = getGitkutUserId(user.id);
  const slug = toProfileSlug(user.login);

  await db.batch([
    db
      .prepare(
        `
        INSERT INTO users (
          id,
          github_id,
          username,
          name,
          avatar_url,
          github_url,
          bio,
          company,
          blog,
          location,
          public_repos,
          followers,
          following,
          github_created_at,
          created_at,
          updated_at,
          last_login_at
        )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?15, ?15)
        ON CONFLICT(github_id) DO UPDATE SET
          username = excluded.username,
          name = excluded.name,
          avatar_url = excluded.avatar_url,
          github_url = excluded.github_url,
          bio = excluded.bio,
          company = excluded.company,
          blog = excluded.blog,
          location = excluded.location,
          public_repos = excluded.public_repos,
          followers = excluded.followers,
          following = excluded.following,
          github_created_at = excluded.github_created_at,
          updated_at = excluded.updated_at,
          last_login_at = excluded.last_login_at
      `,
      )
      .bind(
        userId,
        user.id,
        user.login,
        user.name,
        user.avatar_url,
        user.html_url,
        user.bio,
        user.company,
        user.blog,
        user.location,
        user.public_repos,
        user.followers,
        user.following,
        user.created_at,
        now,
      ),
    db
      .prepare(
        `
        INSERT INTO profiles (
          user_id,
          slug,
          display_name,
          gitkut_bio,
          mood,
          theme,
          is_public,
          created_at,
          updated_at
        )
        VALUES (?1, ?2, ?3, ?4, 'Hacking', 'classic-blue', 1, ?5, ?5)
        ON CONFLICT(user_id) DO NOTHING
      `,
      )
      .bind(userId, slug, user.name ?? user.login, user.bio, now),
  ]);
}

export async function findGitkutProfileByGitHubId(
  db: D1Database | undefined,
  githubId: number,
): Promise<GitkutProfileRecord | null> {
  if (!db) {
    return null;
  }

  const row = await db
    .prepare(
      `
      SELECT
        users.id AS user_id,
        users.github_id,
        users.username,
        users.name,
        users.avatar_url,
        users.github_url,
        users.bio AS github_bio,
        users.company,
        users.blog,
        users.location,
        users.public_repos,
        users.followers,
        users.following,
        users.github_created_at,
        users.created_at,
        users.updated_at,
        users.last_login_at,
        profiles.slug,
        profiles.display_name,
        profiles.gitkut_bio,
        profiles.mood,
        profiles.currently_hacking_on,
        profiles.theme,
        profiles.is_public,
        profiles.created_at AS profile_created_at,
        profiles.updated_at AS profile_updated_at
      FROM users
      INNER JOIN profiles ON profiles.user_id = users.id
      WHERE users.github_id = ?1
    `,
    )
    .bind(githubId)
    .first<GitkutProfileRow>();

  return row ? mapProfileRow(row) : null;
}

function getGitkutUserId(githubId: number): string {
  return `github:${githubId}`;
}

function toProfileSlug(username: string): string {
  return (
    username
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `user-${crypto.randomUUID()}`
  );
}

function mapProfileRow(row: GitkutProfileRow): GitkutProfileRecord {
  return {
    userId: row.user_id,
    githubId: row.github_id,
    username: row.username,
    name: row.name,
    avatarUrl: row.avatar_url,
    githubUrl: row.github_url,
    githubBio: row.github_bio,
    company: row.company,
    blog: row.blog,
    location: row.location,
    publicRepos: row.public_repos,
    followers: row.followers,
    following: row.following,
    githubCreatedAt: row.github_created_at,
    slug: row.slug,
    displayName: row.display_name,
    gitkutBio: row.gitkut_bio,
    mood: row.mood,
    currentlyHackingOn: row.currently_hacking_on,
    theme: row.theme,
    isPublic: row.is_public === 1,
    createdAt: row.profile_created_at,
    updatedAt: row.profile_updated_at,
    lastLoginAt: row.last_login_at,
  };
}
