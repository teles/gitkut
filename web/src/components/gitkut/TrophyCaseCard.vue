<script setup lang="ts">
import { Trophy } from "lucide-vue-next";
import type { GitkutBadge } from "../../types/gitkut";
import RetroBadge from "../retro/RetroBadge.vue";
import RetroCard from "../retro/RetroCard.vue";

defineProps<{
  badges: GitkutBadge[];
}>();
</script>

<template>
  <RetroCard title="Trophy Case" eyebrow="git trophies">
    <template #icon>
      <Trophy class="h-5 w-5 text-gitkut-primary" />
    </template>

    <div v-if="badges.length" class="flex flex-wrap gap-2">
      <RetroBadge
        v-for="badge in badges"
        :key="badge.id"
        :tone="badge.tone"
        :title="badge.description"
      >
        {{ badge.label }}
      </RetroBadge>
    </div>

    <p
      v-else
      class="rounded-lg border border-dashed border-gitkut-line p-4 text-sm text-gitkut-muted"
    >
      No trophies yet.
    </p>
  </RetroCard>
</template>
