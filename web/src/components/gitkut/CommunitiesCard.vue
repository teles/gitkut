<script setup lang="ts">
import { UsersRound } from "lucide-vue-next";
import type { GitkutCommunity } from "../../types/gitkut";
import { formatCompactNumber } from "../../utils/gitkutDisplay";
import RetroBadge from "../retro/RetroBadge.vue";
import RetroCard from "../retro/RetroCard.vue";

defineProps<{
  communities: GitkutCommunity[];
}>();
</script>

<template>
  <RetroCard title="Developer Communities">
    <template #icon>
      <UsersRound class="h-5 w-5 text-gitkut-primary" />
    </template>

    <div v-if="communities.length" class="flex flex-wrap gap-2">
      <RetroBadge
        v-for="community in communities"
        :key="community.id"
        tone="pink"
        :title="`${community.description} ${formatCompactNumber(community.members)} members`"
      >
        #{{ community.slug }}
      </RetroBadge>
    </div>

    <p v-else class="rounded-lg border border-dashed border-gitkut-line p-4 text-sm text-gitkut-muted">
      No communities joined yet.
    </p>
  </RetroCard>
</template>
