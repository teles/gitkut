<script setup lang="ts">
import GitkutProfilePageSkeleton from "../components/gitkut/GitkutProfilePageSkeleton.vue";
import PublicProfilePage from "../components/gitkut/PublicProfilePage.vue";
import { gitkutBadgesFixture } from "../mocks/fixtures/badges";
import { gitkutCommunitiesFixture } from "../mocks/fixtures/communities";
import { gitkutScrapsFixture } from "../mocks/fixtures/scraps";
import { logout } from "../services/gitkutApi";
import type { GitkutRepo, GitkutUser } from "../types/gitkut";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const logoutLoading = ref(false);

const { data, pending, refresh } = await useAsyncData("dashboard", async () => {
  const headers = useRequestHeaders(["cookie"]);

  const user = await $fetch<GitkutUser>(`${apiUrl}/api/me`, {
    headers,
    credentials: "include",
  }).catch((err) => {
    if (err?.status === 401 || err?.statusCode === 401) return null;
    throw err;
  });

  if (!user) {
    await navigateTo("/");
    return null;
  }

  const repos = await $fetch<GitkutRepo[]>(`${apiUrl}/api/repos`, {
    headers,
    credentials: "include",
  }).catch(() => [] as GitkutRepo[]);

  return { user, repos };
});

const me = computed(() => data.value?.user ?? null);
const repos = computed(() => data.value?.repos ?? []);
const loading = computed(() => pending.value || logoutLoading.value);

async function logoutFromGitkut() {
  logoutLoading.value = true;
  try {
    await logout(apiUrl);
    await navigateTo("/");
  } catch {
    logoutLoading.value = false;
  }
}
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
    @refresh="refresh"
    @logout="logoutFromGitkut"
  />
</template>
