<script setup lang="ts">
import { Send, StickyNote } from "lucide-vue-next";
import type { GitkutScrap } from "../../types/gitkut";
import { formatGitkutDate, getInitials } from "../../utils/gitkutDisplay";
import RetroAvatar from "../retro/RetroAvatar.vue";
import RetroButton from "../retro/RetroButton.vue";
import RetroCard from "../retro/RetroCard.vue";

defineProps<{
  scraps: GitkutScrap[];
  username: string;
}>();
</script>

<template>
  <RetroCard title="Recent Scraps">
    <template #icon>
      <StickyNote class="h-5 w-5 text-gitkut-primary" />
    </template>
    <template #actions>
      <button class="text-xs font-bold text-gitkut-primary hover:underline" type="button">
        View All
      </button>
    </template>

    <div v-if="scraps.length" class="space-y-4">
      <article
        v-for="scrap in scraps"
        :key="scrap.id"
        class="flex gap-3 rounded-lg border border-gitkut-lineSoft bg-gitkut-cardSoft p-3 shadow-inset"
      >
        <RetroAvatar
          :src="scrap.authorAvatarUrl"
          :alt="`${scrap.authorName} avatar`"
          :name="scrap.authorName"
          size="sm"
        />
        <div class="min-w-0 flex-1">
          <p class="font-mono text-[11px] font-bold text-gitkut-muted">
            <span class="text-gitkut-primary">@{{ scrap.authorUsername }}</span>
            <span class="font-sans font-normal italic">
              · {{ formatGitkutDate(scrap.createdAt) }}
            </span>
          </p>
          <p
            class="relative mt-2 rounded-lg border border-gitkut-line bg-white p-3 text-sm leading-5 text-gitkut-ink shadow-sm"
          >
            <span
              class="absolute -left-1 top-4 h-2 w-2 rotate-45 border-b border-l border-gitkut-line bg-white"
            />
            {{ scrap.message || `Say hi to ${getInitials(scrap.authorName)}.` }}
          </p>
        </div>
      </article>
    </div>

    <p v-else class="rounded-lg border border-dashed border-gitkut-line p-4 text-sm text-gitkut-muted">
      No scraps yet. Early-2000s silence, but make it peaceful.
    </p>

    <div class="mt-4 flex flex-col gap-2 border-t border-gitkut-lineSoft pt-4 sm:flex-row">
      <input
        class="gitkut-focus min-h-11 flex-1 rounded-lg border border-gitkut-line bg-white px-4 text-sm shadow-inset"
        :placeholder="`Leave a scrap for @${username}...`"
        type="text"
        disabled
      />
      <RetroButton disabled>
        <Send class="h-4 w-4" />
        Post Scrap
      </RetroButton>
    </div>
  </RetroCard>
</template>
