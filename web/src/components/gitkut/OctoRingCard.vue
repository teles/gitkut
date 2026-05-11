<script setup lang="ts">
import { ChevronLeft, ChevronRight, Home, Orbit } from "lucide-vue-next";
import RetroCard from "../retro/RetroCard.vue";

defineProps<{
  username: string;
}>();
</script>

<template>
  <RetroCard title="Octo-Ring" eyebrow="profile ring">
    <template #icon>
      <Orbit class="h-5 w-5 text-gitkut-primary" />
    </template>

    <div
      class="rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 text-center shadow-inset"
    >
      <p class="mb-3 text-sm text-gitkut-muted">
        A tiny webring placeholder for @{{ username }} and future public pages.
      </p>
      <div
        class="flex items-center justify-center gap-3 font-mono text-sm font-bold text-gitkut-primary"
      >
        <a class="inline-flex items-center gap-1 hover:underline" href="#">
          <ChevronLeft class="h-4 w-4" />
          Prev
        </a>
        <span class="text-gitkut-muted">|</span>
        <a class="inline-flex items-center gap-1 hover:underline" href="#">
          <Home class="h-4 w-4" />
          Home
        </a>
        <span class="text-gitkut-muted">|</span>
        <a class="inline-flex items-center gap-1 hover:underline" href="#">
          Next
          <ChevronRight class="h-4 w-4" />
        </a>
      </div>
    </div>
  </RetroCard>
</template>
