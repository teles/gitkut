<script setup lang="ts">
import { BarChart3 } from "lucide-vue-next";
import { computed } from "vue";
import type { GitkutRepo, GitkutUser } from "../../types/gitkut";
import {
  formatCompactNumber,
  getPrimaryLanguage,
  getTotalForks,
  getTotalStars,
} from "../../utils/gitkutDisplay";
import RetroCard from "../retro/RetroCard.vue";
import RetroStat from "../retro/RetroStat.vue";

const props = defineProps<{
  user: GitkutUser;
  repos: GitkutRepo[];
}>();

const totalStars = computed(() => getTotalStars(props.repos));
const totalForks = computed(() => getTotalForks(props.repos));
const primaryLanguage = computed(() => getPrimaryLanguage(props.repos) ?? "None yet");
</script>

<template>
  <RetroCard title="Git Stats" eyebrow="profile pulse">
    <template #icon>
      <BarChart3 class="h-5 w-5 text-gitkut-primary" />
    </template>

    <div class="grid grid-cols-2 gap-3">
      <RetroStat label="Followers" :value="formatCompactNumber(user.followers)" />
      <RetroStat label="Following" :value="formatCompactNumber(user.following)" />
      <RetroStat label="Repos" :value="formatCompactNumber(user.publicRepos)" />
      <RetroStat label="Stars" :value="formatCompactNumber(totalStars)" />
    </div>
    <div
      class="mt-3 flex items-center justify-between rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 shadow-inset"
    >
      <span class="font-mono text-xs font-bold text-gitkut-muted">
        Main language
      </span>
      <strong class="text-sm text-gitkut-primary">{{ primaryLanguage }}</strong>
    </div>
    <div
      class="mt-2 flex items-center justify-between rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 shadow-inset"
    >
      <span class="font-mono text-xs font-bold text-gitkut-muted">
        Forks seen
      </span>
      <strong class="text-sm text-gitkut-primary">{{ formatCompactNumber(totalForks) }}</strong>
    </div>
  </RetroCard>
</template>
