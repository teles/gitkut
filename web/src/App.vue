<script setup lang="ts">
import { onMounted, ref } from "vue";
import GitkutTopbar from "./components/gitkut/GitkutTopbar.vue";
import RetroButton from "./components/retro/RetroButton.vue";
import RetroCard from "./components/retro/RetroCard.vue";
import { gitkutBadgesFixture } from "./mocks/fixtures/badges";
import { gitkutCommunitiesFixture } from "./mocks/fixtures/communities";
import { gitkutScrapsFixture } from "./mocks/fixtures/scraps";
import PublicProfilePage from "./pages/PublicProfilePage.vue";
import {
  getGitHubLoginUrl,
  getMe,
  getRepos,
  GitkutUnauthorizedError,
} from "./services/gitkutApi";
import type { GitkutRepo, GitkutUser } from "./types/gitkut";

const me = ref<GitkutUser | null>(null);
const repos = ref<GitkutRepo[]>([]);
const loading = ref(true);
const error = ref("");

function loginWithGitHub() {
  window.location.href = getGitHubLoginUrl();
}

async function loadGitkutProfile() {
  loading.value = true;
  error.value = "";

  try {
    const user = await getMe();

    if (!user) {
      me.value = null;
      repos.value = [];
      return;
    }

    me.value = user;
    repos.value = await getRepos();
  } catch (cause) {
    if (cause instanceof GitkutUnauthorizedError) {
      me.value = null;
      repos.value = [];
      return;
    }

    error.value =
      cause instanceof Error ? cause.message : "Erro inesperado ao carregar.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadGitkutProfile);
</script>

<template>
  <PublicProfilePage
    v-if="me"
    :user="me"
    :repos="repos"
    :scraps="gitkutScrapsFixture"
    :communities="gitkutCommunitiesFixture"
    :badges="gitkutBadgesFixture"
    :loading="loading"
    @refresh="loadGitkutProfile"
  />

  <div v-else class="min-h-screen bg-gitkut-bg text-gitkut-ink">
    <GitkutTopbar @login="loginWithGitHub" />

    <main class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center px-4 py-10">
      <RetroCard class="w-full">
        <div class="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p class="font-mono text-xs font-bold uppercase tracking-[0.08em] text-gitkut-primary">
              social retro para devs
            </p>
            <h1 class="mt-2 text-4xl font-bold italic text-gitkut-primary">
              Gitkut
            </h1>
            <p class="mt-4 max-w-xl text-base leading-7 text-gitkut-muted">
              Entre com GitHub para importar seu perfil publico e montar uma
              pagina social retro com repositorios, scraps e comunidades.
            </p>
            <p
              v-if="error"
              class="mt-4 rounded-lg border border-gitkut-yellowLine bg-gitkut-yellow p-3 text-sm text-[#554245]"
            >
              {{ error }}
            </p>
            <p
              v-else-if="loading"
              class="mt-4 rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 text-sm text-gitkut-muted"
            >
              Verificando sessao local...
            </p>
          </div>

          <RetroButton :disabled="loading" @click="loginWithGitHub">
            Entrar com GitHub
          </RetroButton>
        </div>
      </RetroCard>
    </main>
  </div>
</template>
