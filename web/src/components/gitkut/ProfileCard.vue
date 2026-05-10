<script setup lang="ts">
import {
  CalendarDays,
  Copy,
  Link as LinkIcon,
  Pencil,
  Share2,
  Wifi,
} from "lucide-vue-next";
import type { GitkutUser } from "../../types/gitkut";
import { formatCompactNumber, getDisplayName } from "../../utils/gitkutDisplay";
import RetroAvatar from "../retro/RetroAvatar.vue";
import RetroButton from "../retro/RetroButton.vue";
import RetroCard from "../retro/RetroCard.vue";

const props = withDefaults(
  defineProps<{
    user: GitkutUser;
    mood?: string;
    currentlyHackingOn?: string;
    profileViews?: number;
  }>(),
  {
    mood: "Hacking",
    currentlyHackingOn: "gitkut",
    profileViews: 1337,
  },
);
</script>

<template>
  <RetroCard>
    <div class="flex flex-col items-center text-center">
      <RetroAvatar
        :src="user.avatarUrl"
        :alt="`${user.username}'s avatar`"
        :name="getDisplayName(user)"
        size="lg"
      />

      <h1 class="mt-5 text-2xl font-bold leading-7 text-gitkut-ink">
        {{ getDisplayName(user) }}
      </h1>
      <a
        :href="user.url"
        target="_blank"
        rel="noreferrer"
        class="mt-1 text-sm font-medium text-gitkut-muted hover:text-gitkut-primary hover:underline"
      >
        @{{ user.username }}
      </a>

      <p
        class="mt-3 rounded-full border border-gitkut-pink bg-gitkut-pinkSoft px-3 py-1 text-xs font-medium text-gitkut-primaryDark"
      >
        Currently hacking on: {{ currentlyHackingOn }}
      </p>

      <div
        class="relative mt-4 w-full rounded-lg border border-gitkut-yellowLine bg-gitkut-yellow p-3 text-sm text-[#554245] shadow-inset"
      >
        <span
          class="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gitkut-primary font-mono text-xs font-bold text-white"
        >
          "
        </span>
        {{ user.bio || "This profile is still waiting for a retro bio." }}
      </div>
    </div>

    <div class="mt-5 space-y-2 text-sm text-gitkut-muted">
      <p class="flex items-center gap-2">
        <CalendarDays class="h-4 w-4" />
        Gitkut since 2026
      </p>
      <p class="flex items-center gap-2">
        <Wifi class="h-4 w-4" />
        Online via GitHub OAuth
      </p>
      <p class="flex items-center gap-2">
        <LinkIcon class="h-4 w-4" />
        gitkut.local/@{{ user.username }}
      </p>
    </div>

    <div class="mt-5 space-y-2">
      <div
        class="flex items-center justify-between rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 shadow-inset"
      >
        <span class="font-mono text-xs font-bold text-gitkut-muted">
          Gitkut Mood:
        </span>
        <strong class="text-sm text-gitkut-ink">{{ mood }}</strong>
      </div>
      <div
        class="flex items-center justify-between rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 shadow-inset"
      >
        <span class="font-mono text-xs font-bold text-gitkut-muted">
          Profile Views:
        </span>
        <strong class="text-xl text-gitkut-primary">
          {{ formatCompactNumber(profileViews) }}
        </strong>
      </div>
    </div>

    <div class="mt-6 space-y-2">
      <RetroButton variant="secondary" block>
        <Pencil class="h-4 w-4" />
        Edit Profile
      </RetroButton>
      <div class="grid grid-cols-2 gap-2">
        <RetroButton variant="ghost" size="sm">
          <Share2 class="h-4 w-4" />
          Share
        </RetroButton>
        <RetroButton variant="ghost" size="sm">
          <Copy class="h-4 w-4" />
          Copy
        </RetroButton>
      </div>
    </div>
  </RetroCard>
</template>
