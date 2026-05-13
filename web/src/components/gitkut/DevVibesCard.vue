<script setup lang="ts">
import { Star } from "lucide-vue-next";
import RetroCard from "../retro/RetroCard.vue";

const MAX = 3;

const vibes = [
  {
    label: "Technical",
    filledIcon: "/dev-vibes/robot-filled.svg",
    emptyIcon: "/dev-vibes/robot-empty.svg",
    value: 1,
  },
  {
    label: "Creative",
    filledIcon: "/dev-vibes/bulb-filled.svg",
    emptyIcon: "/dev-vibes/bulb-empty.svg",
    value: 2,
  },
  {
    label: "Team Player",
    filledIcon: "/dev-vibes/heart-filled.svg",
    emptyIcon: "/dev-vibes/heart-empty.svg",
    value: 2,
  },
];
</script>

<template>
  <RetroCard title="Dev Vibes">
    <template #icon>
      <Star class="h-5 w-5 text-gitkut-primary" fill="currentColor" />
    </template>

    <div class="space-y-2">
      <div
        v-for="vibe in vibes"
        :key="vibe.label"
        class="flex items-center justify-between rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-2 shadow-inset"
      >
        <span class="font-mono text-xs font-bold text-gitkut-muted">{{
          vibe.label
        }}</span>
        <div class="flex gap-0.5">
          <img
            v-for="n in MAX"
            :key="n"
            :src="n <= vibe.value ? vibe.filledIcon : vibe.emptyIcon"
            :alt="`${vibe.label} ${n <= vibe.value ? 'filled' : 'empty'} marker`"
            class="h-5 w-5 object-contain drop-shadow-[0_1px_0_rgba(17,28,44,0.2)]"
          />
        </div>
      </div>
    </div>
  </RetroCard>
</template>
