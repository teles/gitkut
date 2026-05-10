import type { GitkutRepo, GitkutUser } from "../types/gitkut";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8787";

export class GitkutApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "GitkutApiError";
  }
}

export class GitkutUnauthorizedError extends GitkutApiError {
  constructor() {
    super("Usuario nao autenticado.", 401);
    this.name = "GitkutUnauthorizedError";
  }
}

export function getGitHubLoginUrl() {
  return `${API_URL}/auth/github`;
}

export async function getMe(): Promise<GitkutUser | null> {
  const data = await requestJson<unknown>("/api/me", {
    allowUnauthorized: true,
  });

  if (data === null) {
    return null;
  }

  if (!isGitkutUser(data)) {
    throw new GitkutApiError("Resposta invalida ao carregar o perfil.");
  }

  return data;
}

export async function getRepos(): Promise<GitkutRepo[]> {
  const data = await requestJson<unknown>("/api/repos");

  if (!Array.isArray(data) || !data.every(isGitkutRepo)) {
    throw new GitkutApiError("Resposta invalida ao carregar repositorios.");
  }

  return data;
}

async function requestJson<T>(
  path: string,
  options: { allowUnauthorized?: boolean } = {},
): Promise<T | null> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      credentials: "include",
    });
  } catch {
    throw new GitkutApiError("Nao foi possivel conectar com a API do Gitkut.");
  }

  if (response.status === 401) {
    if (options.allowUnauthorized) {
      return null;
    }

    throw new GitkutUnauthorizedError();
  }

  if (!response.ok) {
    throw new GitkutApiError(
      `Erro inesperado da API do Gitkut (${response.status}).`,
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new GitkutApiError("A API retornou JSON invalido.");
  }
}

function isGitkutUser(value: unknown): value is GitkutUser {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.username === "string" &&
    (typeof value.name === "string" || value.name === null) &&
    typeof value.avatarUrl === "string" &&
    typeof value.url === "string" &&
    (typeof value.bio === "string" || value.bio === null) &&
    typeof value.followers === "number" &&
    typeof value.following === "number" &&
    typeof value.publicRepos === "number"
  );
}

function isGitkutRepo(value: unknown): value is GitkutRepo {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.fullName === "string" &&
    typeof value.url === "string" &&
    (typeof value.description === "string" || value.description === null) &&
    (typeof value.language === "string" || value.language === null) &&
    typeof value.stars === "number" &&
    typeof value.forks === "number" &&
    typeof value.isFork === "boolean" &&
    typeof value.updatedAt === "string"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
