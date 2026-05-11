<script setup lang="ts">
import { FileText, LogIn, Users, UserSquare } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import PublicProfilePage from "../components/gitkut/PublicProfilePage.vue";
import GitkutTopbar from "../components/gitkut/GitkutTopbar.vue";
import RetroButton from "../components/retro/RetroButton.vue";
import { gitkutBadgesFixture } from "../mocks/fixtures/badges";
import { gitkutCommunitiesFixture } from "../mocks/fixtures/communities";
import { gitkutScrapsFixture } from "../mocks/fixtures/scraps";
import {
  getGitHubLoginUrl,
  getMe,
  getRepos,
  GitkutUnauthorizedError,
  logout,
} from "../services/gitkutApi";
import type { GitkutRepo, GitkutUser } from "../types/gitkut";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const me = ref<GitkutUser | null>(null);
const repos = ref<GitkutRepo[]>([]);
const loading = ref(true);
const error = ref("");

function loginWithGitHub() {
  window.location.href = getGitHubLoginUrl(apiUrl);
}

async function loadGitkutProfile() {
  loading.value = true;
  error.value = "";

  try {
    const user = await getMe(apiUrl);

    if (!user) {
      me.value = null;
      repos.value = [];
      return;
    }

    me.value = user;
    repos.value = await getRepos(apiUrl);
  } catch (cause) {
    if (cause instanceof GitkutUnauthorizedError) {
      me.value = null;
      repos.value = [];
      return;
    }

    error.value =
      cause instanceof Error ? cause.message : "Unexpected error while loading.";
  } finally {
    loading.value = false;
  }
}

async function logoutFromGitkut() {
  loading.value = true;
  error.value = "";

  try {
    await logout(apiUrl);
    me.value = null;
    repos.value = [];
  } catch (cause) {
    error.value =
      cause instanceof Error ? cause.message : "Unexpected error while signing out.";
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
    authenticated
    :loading="loading"
    @refresh="loadGitkutProfile"
    @logout="logoutFromGitkut"
  />

  <div v-else class="flex min-h-screen flex-col bg-gitkut-bg text-gitkut-ink">
    <GitkutTopbar @login="loginWithGitHub" />

    <main class="mx-auto flex w-full max-w-gitkut flex-grow flex-col gap-10 px-6 py-12">
      <section
        class="flex flex-col items-center gap-10 rounded-lg border border-gitkut-lineSoft bg-white p-10 shadow-retro md:flex-row"
      >
        <div class="flex flex-1 flex-col items-start gap-4">
          <h1
            class="text-4xl font-bold italic leading-tight tracking-tight text-gitkut-ink"
          >
            Your GitHub, but 2004.
          </h1>
          <p class="max-w-lg text-base leading-7 text-gitkut-muted">
            Connect your GitHub and build a nostalgic social profile to share with
            friends. Import repos, get scraps, and join communities.
          </p>
          <p
            v-if="error"
            class="rounded-lg border border-gitkut-yellowLine bg-gitkut-yellow p-3 text-sm text-[#554245]"
          >
            {{ error }}
          </p>
          <p
            v-else-if="loading"
            class="rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 text-sm text-gitkut-muted"
          >
            Checking local session...
          </p>
          <RetroButton class="mt-2" :disabled="loading" @click="loginWithGitHub">
            <LogIn class="h-4 w-4" />
            Sign in with GitHub
          </RetroButton>
        </div>
        <div class="w-full max-w-sm flex-1">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuYCLIbF7rtOBsxE-Xd20_Kg-20PSca971KpuiojcOOiqZcKA0Ao-bdE3HH0m8NQk7r4G9PO8XPV5u7wcWvNl3ApZjT9WjyqcDTKW8LI1UQw8VabH8xanZ00UnIe1z2Cp--8LSl7yMU9jqzI-mQ4gkaXyauUjnqDBxWqBY2Qx2-xx5hdXIQE7F64rObaNm1qWDTjoElWUaZmTTV-cP0Dk7r77JRXLTz258lZiNRFuPUmbqufLtnUlSvEhHIkunQ5d9CKOnBebjNKqV"
            alt="A vintage desktop computer setup with code on the screen"
            class="h-auto w-full rounded-lg border border-gitkut-lineSoft object-cover"
          />
        </div>
      </section>

      <section class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          class="flex flex-col gap-3 rounded-lg border border-gitkut-lineSoft bg-white p-6 shadow-retro"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gitkut-bluePill"
          >
            <UserSquare class="h-5 w-5 text-gitkut-muted" />
          </div>
          <h3 class="text-base font-bold text-gitkut-ink">Retro Profiles</h3>
          <p class="text-sm leading-6 text-gitkut-muted">
            Display your repos and stats with early-web polish. Customize your page to
            reflect your unique developer identity.
          </p>
        </div>
        <div
          class="flex flex-col gap-3 rounded-lg border border-gitkut-lineSoft bg-white p-6 shadow-retro"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gitkut-bluePill"
          >
            <FileText class="h-5 w-5 text-gitkut-muted" />
          </div>
          <h3 class="text-base font-bold text-gitkut-ink">The Scrapbook</h3>
          <p class="text-sm leading-6 text-gitkut-muted">
            Receive testimonials and &ldquo;scraps&rdquo; from other developers. Build a
            public wall of camaraderie and shared memories.
          </p>
        </div>
        <div
          class="flex flex-col gap-3 rounded-lg border border-gitkut-lineSoft bg-white p-6 shadow-retro"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gitkut-bluePill"
          >
            <Users class="h-5 w-5 text-gitkut-muted" />
          </div>
          <h3 class="text-base font-bold text-gitkut-ink">
            Webrings &amp; Communities
          </h3>
          <p class="text-sm leading-6 text-gitkut-muted">
            Join tech communities and nostalgic webrings. Discover new projects and
            connect with like-minded creators.
          </p>
        </div>
      </section>
    </main>

    <footer class="border-t border-gitkut-line bg-gitkut-cardSoft">
      <div
        class="mx-auto flex max-w-gitkut flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row"
      >
        <span class="text-lg font-bold italic text-gitkut-primary">Gitkut</span>
        <span class="text-center text-sm text-gitkut-muted">
          &copy; 2026 Gitkut &mdash; Built for the early-web dreamers.
        </span>
        <nav class="flex flex-wrap justify-center gap-4">
          <a
            v-for="link in ['Privacy', 'Terms', 'GitHub', 'Contact']"
            :key="link"
            href="#"
            class="text-sm text-gitkut-muted opacity-80 transition-opacity hover:text-gitkut-primary hover:opacity-100"
          >
            {{ link }}
          </a>
        </nav>
      </div>
    </footer>
  </div>
</template>
