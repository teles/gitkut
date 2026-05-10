<script setup lang="ts">
import { Sparkles } from "lucide-vue-next";
import RetroCard from "../retro/RetroCard.vue";

withDefaults(
  defineProps<{
    mood?: string;
    currentlyHackingOn?: string;
  }>(),
  {
    mood: "Hacking",
    currentlyHackingOn: "gitkut",
  },
);
</script>

<template>
  <RetroCard title="Mood" eyebrow="status">
    <template #icon>
      <Sparkles class="h-5 w-5 text-gitkut-primary" />
    </template>

    <div class="space-y-3">
      <div class="rounded-lg border border-gitkut-yellowLine bg-gitkut-yellow p-3 shadow-inset">
        <p class="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-gitkut-muted">
          Gitkut mood
        </p>
        <p class="mt-1 text-lg font-bold text-gitkut-primary">{{ mood }}</p>
      </div>
      <div class="rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 shadow-inset">
        <p class="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-gitkut-muted">
          Currently hacking on
        </p>
        <p class="mt-1 font-mono text-sm font-bold text-gitkut-ink">
          {{ currentlyHackingOn }}
        </p>
      </div>
    </div>
  </RetroCard>
</template>
