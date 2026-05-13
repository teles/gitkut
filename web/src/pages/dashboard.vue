<script setup lang="ts">
import { ref } from "vue";
import GitkutProfilePageSkeleton from "../components/gitkut/GitkutProfilePageSkeleton.vue";
import PublicProfilePage from "../components/gitkut/PublicProfilePage.vue";
import { gitkutBadgesFixture } from "../mocks/fixtures/badges";
import { gitkutCommunitiesFixture } from "../mocks/fixtures/communities";
import { gitkutScrapsFixture } from "../mocks/fixtures/scraps";
import {
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

async function loadGitkutProfile() {
  loading.value = true;
  error.value = "";

  try {
    const user = await getMe(apiUrl);

    if (!user) {
      await navigateTo("/");
      return;
    }

    me.value = user;
    repos.value = await getRepos(apiUrl);
  } catch (cause) {
    if (cause instanceof GitkutUnauthorizedError) {
      await navigateTo("/");
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
    await navigateTo("/");
  } catch (cause) {
    error.value =
      cause instanceof Error ? cause.message : "Unexpected error while signing out.";
    loading.value = false;
  }
}

onMounted(loadGitkutProfile);
</script>

<template>
  <GitkutProfilePageSkeleton
    v-if="loading || !me"
    authenticated
    :username="me?.username ?? ''"
  />

  <PublicProfilePage
    v-else
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
</template>
