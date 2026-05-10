<script setup lang="ts">
import { FolderOpen } from "lucide-vue-next";
import { computed } from "vue";
import type { GitkutRepo } from "../../types/gitkut";
import RetroCard from "../retro/RetroCard.vue";
import RepoCard from "./RepoCard.vue";

const props = withDefaults(
  defineProps<{
    repos: GitkutRepo[];
    limit?: number;
  }>(),
  {
    limit: 4,
  },
);

const visibleRepos = computed(() => props.repos.slice(0, props.limit));
</script>

<template>
  <RetroCard title="Featured Repositories">
    <template #icon>
      <FolderOpen class="h-5 w-5 text-gitkut-primary" />
    </template>

    <div v-if="visibleRepos.length" class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <RepoCard v-for="repo in visibleRepos" :key="repo.id" :repo="repo" />
    </div>

    <p v-else class="rounded-lg border border-dashed border-gitkut-line p-4 text-sm text-gitkut-muted">
      No public repositories imported yet.
    </p>
  </RetroCard>
</template>
