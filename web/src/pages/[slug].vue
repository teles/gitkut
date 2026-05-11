<script setup lang="ts">
import { LogIn } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import PublicProfilePage from "../components/gitkut/PublicProfilePage.vue";
import GitkutTopbar from "../components/gitkut/GitkutTopbar.vue";
import RetroButton from "../components/retro/RetroButton.vue";
import { gitkutBadgesFixture } from "../mocks/fixtures/badges";
import { gitkutCommunitiesFixture } from "../mocks/fixtures/communities";
import { gitkutScrapsFixture } from "../mocks/fixtures/scraps";
import {
  getGitHubLoginUrl,
  getPublicProfile,
  GitkutApiError,
} from "../services/gitkutApi";
import type { GitkutPublicProfile } from "../types/gitkut";
import { getPublicProfileSlugFromPath } from "../utils/profileRoutes";

const route = useRoute();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const rawSlug = Array.isArray(route.params.slug)
  ? route.params.slug[0]
  : route.params.slug;
const publicProfileSlug = getPublicProfileSlugFromPath(`/${rawSlug ?? ""}`);
const publicProfile = ref<GitkutPublicProfile | null>(null);
const loading = ref(true);
const error = ref("");

function loginWithGitHub() {
  window.location.href = getGitHubLoginUrl(apiUrl);
}

async function loadPublicProfile() {
  if (!publicProfileSlug) {
    error.value = "This route is reserved by Gitkut.";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    publicProfile.value = await getPublicProfile(publicProfileSlug, apiUrl);
  } catch (cause) {
    if (cause instanceof GitkutApiError && cause.status === 404) {
      error.value = `No Gitkut profile found for /${publicProfileSlug}.`;
      return;
    }

    error.value =
      cause instanceof Error
        ? cause.message
        : "Unexpected error while loading public profile.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadPublicProfile);
</script>

<template>
  <PublicProfilePage
    v-if="publicProfile"
    :profile="publicProfile.profile"
    :user="publicProfile.user"
    :repos="publicProfile.repos"
    :scraps="gitkutScrapsFixture"
    :communities="gitkutCommunitiesFixture"
    :badges="gitkutBadgesFixture"
    :loading="loading"
  />

  <div v-else class="flex min-h-screen flex-col bg-gitkut-bg text-gitkut-ink">
    <GitkutTopbar @login="loginWithGitHub" />

    <main class="mx-auto flex w-full max-w-3xl flex-grow items-center px-6 py-12">
      <section
        class="w-full rounded-lg border border-gitkut-lineSoft bg-white p-8 text-center shadow-retro"
      >
        <p class="font-mono text-xs font-bold uppercase tracking-[0.08em] text-gitkut-primary">
          public profile
        </p>
        <h1 class="mt-2 text-3xl font-bold text-gitkut-ink">
          {{ loading ? "Loading Gitkut profile..." : "Profile not found" }}
        </h1>
        <p class="mt-3 text-sm leading-6 text-gitkut-muted">
          {{
            loading
              ? `Looking for /${publicProfileSlug ?? rawSlug} in the Gitkut webring.`
              : error || "This public Gitkut profile does not exist yet."
          }}
        </p>
        <RetroButton class="mt-6" @click="loginWithGitHub">
          <LogIn class="h-4 w-4" />
          Sign in with GitHub
        </RetroButton>
      </section>
    </main>
  </div>
</template>
