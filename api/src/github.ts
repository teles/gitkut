export type GitHubUser = {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
};

export type GitHubTokenResponse = {
  access_token?: string;
  token_type?: string;
  scope?: string;
  error?: string;
  error_description?: string;
};

const GITHUB_API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "Gitkut Local Dev",
};

export async function exchangeCodeForToken(params: {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}): Promise<GitHubTokenResponse> {
  const body = new URLSearchParams({
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
    redirect_uri: params.redirectUri,
  });

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  return response.json() as Promise<GitHubTokenResponse>;
}

export async function fetchGitHubUser(token: string): Promise<GitHubUser> {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      ...GITHUB_API_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub user request failed: ${response.status}`);
  }

  return response.json() as Promise<GitHubUser>;
}

export async function fetchRecentPublicRepos(token: string): Promise<GitHubRepo[]> {
  const params = new URLSearchParams({
    visibility: "public",
    sort: "updated",
    direction: "desc",
    per_page: "12",
  });

  const response = await fetch(`https://api.github.com/user/repos?${params}`, {
    headers: {
      ...GITHUB_API_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub repos request failed: ${response.status}`);
  }

  return response.json() as Promise<GitHubRepo[]>;
}

export async function fetchPublicReposByUsername(
  username: string,
): Promise<GitHubRepo[]> {
  const params = new URLSearchParams({
    sort: "updated",
    direction: "desc",
    per_page: "12",
  });

  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?${params}`,
    {
      headers: GITHUB_API_HEADERS,
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub public repos request failed: ${response.status}`);
  }

  return response.json() as Promise<GitHubRepo[]>;
}
