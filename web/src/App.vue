<script setup lang="ts">
import { onMounted, ref } from "vue";

type GitkutUser = {
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

type GitkutRepo = {
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

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8787";

const me = ref<GitkutUser | null>(null);
const repos = ref<GitkutRepo[]>([]);
const loading = ref(true);
const error = ref("");

function loginWithGitHub() {
  window.location.href = `${API_URL}/auth/github`;
}

async function loadGitkutProfile() {
  loading.value = true;
  error.value = "";

  try {
    const meResponse = await fetch(`${API_URL}/api/me`, {
      credentials: "include",
    });

    if (meResponse.status === 401) {
      me.value = null;
      repos.value = [];
      return;
    }

    if (!meResponse.ok) {
      throw new Error("Nao foi possivel carregar o perfil.");
    }

    me.value = await meResponse.json();

    const reposResponse = await fetch(`${API_URL}/api/repos`, {
      credentials: "include",
    });

    if (!reposResponse.ok) {
      throw new Error("Nao foi possivel carregar os repositorios.");
    }

    repos.value = await reposResponse.json();
  } catch (cause) {
    error.value =
      cause instanceof Error ? cause.message : "Erro inesperado ao carregar.";
  } finally {
    loading.value = false;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

onMounted(loadGitkutProfile);
</script>

<template>
  <main class="page">
    <section class="shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">social retro para devs</p>
          <h1>Gitkut</h1>
        </div>

        <button v-if="me" class="ghost-button" type="button" @click="loadGitkutProfile">
          Atualizar
        </button>
      </header>

      <p v-if="loading" class="status">Carregando...</p>

      <p v-else-if="error" class="status error">{{ error }}</p>

      <section v-else-if="!me" class="login-panel">
        <div>
          <h2>Entre para montar seu perfil Gitkut local.</h2>
          <p>
            O Gitkut vai importar seu perfil publico e seus repositorios recentes
            usando OAuth do GitHub.
          </p>
        </div>

        <button class="primary-button" type="button" @click="loginWithGitHub">
          Entrar com GitHub
        </button>
      </section>

      <section v-else class="profile-grid">
        <aside class="profile-card">
          <img :src="me.avatarUrl" :alt="`Avatar de ${me.username}`" />

          <h2>{{ me.name || me.username }}</h2>
          <a :href="me.url" target="_blank" rel="noreferrer">@{{ me.username }}</a>
          <p>{{ me.bio || "Sem bio publica por enquanto." }}</p>

          <dl class="stats">
            <div>
              <dt>Seguidores</dt>
              <dd>{{ me.followers }}</dd>
            </div>
            <div>
              <dt>Seguindo</dt>
              <dd>{{ me.following }}</dd>
            </div>
            <div>
              <dt>Repos publicos</dt>
              <dd>{{ me.publicRepos }}</dd>
            </div>
          </dl>
        </aside>

        <section class="repo-panel">
          <header>
            <h2>Repositorios recentes</h2>
            <span>{{ repos.length }} importados</span>
          </header>

          <ul class="repo-list">
            <li v-for="repo in repos" :key="repo.id">
              <div>
                <a :href="repo.url" target="_blank" rel="noreferrer">
                  {{ repo.name }}
                </a>
                <p>{{ repo.description || "Sem descricao." }}</p>
              </div>

              <footer>
                <span v-if="repo.language">{{ repo.language }}</span>
                <span>{{ repo.stars }} stars</span>
                <span>{{ repo.forks }} forks</span>
                <span>{{ formatDate(repo.updatedAt) }}</span>
              </footer>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </main>
</template>

