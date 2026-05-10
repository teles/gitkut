<script setup lang="ts">
import { Clock3, GitFork, Star } from "lucide-vue-next";
import type { GitkutRepo } from "../../types/gitkut";
import { formatGitkutDate } from "../../utils/gitkutDisplay";
import RetroBadge from "../retro/RetroBadge.vue";

defineProps<{
  repo: GitkutRepo;
}>();
</script>

<template>
  <article
    class="group flex h-full flex-col rounded-lg border border-gitkut-line bg-gradient-to-b from-white to-gitkut-bg p-3 shadow-inset transition hover:-translate-y-0.5 hover:border-gitkut-pink hover:shadow-retro-hover"
  >
    <header class="flex items-start justify-between gap-3">
      <a
        :href="repo.url"
        target="_blank"
        rel="noreferrer"
        class="min-w-0 font-mono text-sm font-bold text-gitkut-primary group-hover:underline"
      >
        {{ repo.name }}
      </a>
      <span class="inline-flex shrink-0 items-center gap-1 text-xs text-gitkut-muted">
        <Star class="h-3.5 w-3.5" />
        {{ repo.stars }}
      </span>
    </header>

    <p class="mt-2 line-clamp-3 flex-1 text-sm leading-5 text-gitkut-muted">
      {{ repo.description || "No description yet. Mystery repo energy." }}
    </p>

    <footer class="mt-3 flex flex-wrap items-center gap-2">
      <RetroBadge v-if="repo.language" tone="blue">
        {{ repo.language }}
      </RetroBadge>
      <RetroBadge v-if="repo.isFork" tone="gray">Fork</RetroBadge>
      <span class="inline-flex items-center gap-1 text-[11px] text-gitkut-muted">
        <GitFork class="h-3.5 w-3.5" />
        {{ repo.forks }}
      </span>
      <span class="inline-flex items-center gap-1 text-[11px] text-gitkut-muted">
        <Clock3 class="h-3.5 w-3.5" />
        {{ formatGitkutDate(repo.updatedAt) }}
      </span>
    </footer>
  </article>
</template>
