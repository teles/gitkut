<script setup lang="ts">
import { UserRound } from "lucide-vue-next";
import type { GitkutUser } from "../../types/gitkut";
import { getDisplayName } from "../../utils/gitkutDisplay";
import RetroCard from "../retro/RetroCard.vue";

defineProps<{
  user: GitkutUser;
}>();
</script>

<template>
  <RetroCard title="About Me">
    <template #icon>
      <UserRound class="h-5 w-5 text-gitkut-primary" />
    </template>

    <div class="space-y-3 text-[15px] leading-6 text-gitkut-ink">
      <p>
        Welcome to {{ getDisplayName(user) }}'s Gitkut page, assembled from
        public GitHub profile data and wrapped in a friendly retro shell.
      </p>
      <p>
        {{ user.bio || "No public bio yet. The guestbook is still open." }}
      </p>
    </div>
  </RetroCard>
</template>
