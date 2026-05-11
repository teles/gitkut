<script setup lang="ts">
import {
  BarChart3,
  CalendarDays,
  Clock3,
  Copy,
  FolderOpen,
  GitFork,
  Link as LinkIcon,
  Orbit,
  Pencil,
  Send,
  Share2,
  Sparkles,
  Star,
  StickyNote,
  Trophy,
  UserRound,
  UsersRound,
} from "lucide-vue-next";
import GitkutTopbar from "./GitkutTopbar.vue";
import RetroCard from "../retro/RetroCard.vue";
import RetroSkeleton from "../retro/RetroSkeleton.vue";

withDefaults(
  defineProps<{
    authenticated?: boolean;
    username?: string;
  }>(),
  {
    authenticated: true,
    username: "",
  },
);

defineEmits<{
  login: [];
}>();
</script>

<template>
  <div
    class="min-h-screen bg-gitkut-bg text-gitkut-ink"
    aria-busy="true"
    aria-live="polite"
  >
    <GitkutTopbar
      :authenticated="authenticated"
      loading
      :username="username"
      @login="$emit('login')"
    />

    <span class="sr-only">Loading Gitkut profile...</span>

    <main
      class="mx-auto grid max-w-gitkut grid-cols-1 gap-4 px-4 py-5 md:px-6 lg:grid-cols-12"
    >
      <aside class="space-y-4 lg:col-span-3">
        <RetroCard>
          <div class="flex flex-col items-center text-center">
            <RetroSkeleton class="h-32 w-32" rounded="xl" />
            <RetroSkeleton class="mt-5 h-7 w-36" rounded="lg" />
            <RetroSkeleton class="mt-2 h-4 w-24" rounded="full" />
            <RetroSkeleton class="mt-4 h-7 w-full" rounded="full" />
            <RetroSkeleton class="mt-4 h-20 w-full" rounded="lg" />
          </div>

          <div class="mt-5 space-y-3">
            <div class="flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                class="h-4 w-4 shrink-0 text-gitkut-muted"
              />
              <RetroSkeleton class="h-5 w-40" rounded="full" />
            </div>
            <div class="flex items-center gap-2">
              <LinkIcon
                aria-hidden="true"
                class="h-4 w-4 shrink-0 text-gitkut-muted"
              />
              <RetroSkeleton class="h-5 w-44" rounded="full" />
            </div>
          </div>

          <div class="mt-5 space-y-2">
            <div
              class="flex items-center justify-between gap-3 rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 shadow-inset"
            >
              <RetroSkeleton class="h-4 w-24" rounded="full" />
              <RetroSkeleton class="h-4 w-20" rounded="full" />
            </div>
            <div
              class="flex items-center justify-between gap-3 rounded-lg border border-gitkut-line bg-gitkut-cardSoft p-3 shadow-inset"
            >
              <RetroSkeleton class="h-4 w-28" rounded="full" />
              <RetroSkeleton class="h-7 w-16" rounded="full" />
            </div>
          </div>

          <div class="mt-6 space-y-2">
            <div
              class="flex h-11 items-center justify-center gap-2 rounded-lg border border-gitkut-pink bg-white px-3 text-gitkut-primary shadow-sm"
            >
              <Pencil aria-hidden="true" class="h-4 w-4" />
              <RetroSkeleton class="h-4 w-24" rounded="full" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div
                class="flex h-10 items-center justify-center gap-2 rounded-lg border border-gitkut-line bg-white px-3 text-gitkut-muted shadow-sm"
              >
                <Share2 aria-hidden="true" class="h-4 w-4" />
                <RetroSkeleton class="h-4 w-12" rounded="full" />
              </div>
              <div
                class="flex h-10 items-center justify-center gap-2 rounded-lg border border-gitkut-line bg-white px-3 text-gitkut-muted shadow-sm"
              >
                <Copy aria-hidden="true" class="h-4 w-4" />
                <RetroSkeleton class="h-4 w-10" rounded="full" />
              </div>
            </div>
          </div>
        </RetroCard>
      </aside>

      <section class="space-y-4 lg:col-span-6">
        <RetroCard title="About Me">
          <template #icon>
            <UserRound aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <div class="space-y-3">
            <RetroSkeleton class="h-5 w-full" rounded="full" />
            <RetroSkeleton class="h-5 w-11/12" rounded="full" />
            <RetroSkeleton class="h-5 w-2/3" rounded="full" />
          </div>
        </RetroCard>

        <RetroCard title="Featured Repositories">
          <template #icon>
            <FolderOpen aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              v-for="index in 4"
              :key="index"
              class="rounded-lg border border-gitkut-line bg-gradient-to-b from-white to-gitkut-bg p-3 shadow-inset"
            >
              <div class="flex items-start justify-between gap-3">
                <RetroSkeleton class="h-5 w-32" rounded="full" />
                <div class="flex items-center gap-1 text-gitkut-muted">
                  <Star aria-hidden="true" class="h-4 w-4" />
                  <RetroSkeleton class="h-4 w-8" rounded="full" />
                </div>
              </div>
              <div class="mt-3 space-y-2">
                <RetroSkeleton class="h-4 w-full" rounded="full" />
                <RetroSkeleton class="h-4 w-10/12" rounded="full" />
                <RetroSkeleton class="h-4 w-8/12" rounded="full" />
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <RetroSkeleton class="h-6 w-24" rounded="full" />
                <span class="inline-flex h-6 items-center gap-1 text-gitkut-muted">
                  <GitFork aria-hidden="true" class="h-4 w-4" />
                  <RetroSkeleton class="h-4 w-8" rounded="full" />
                </span>
                <span class="inline-flex h-6 items-center gap-1 text-gitkut-muted">
                  <Clock3 aria-hidden="true" class="h-4 w-4" />
                  <RetroSkeleton class="h-4 w-16" rounded="full" />
                </span>
              </div>
            </div>
          </div>
        </RetroCard>

        <RetroCard title="Recent Scraps">
          <template #icon>
            <StickyNote aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <div class="space-y-4">
            <div
              v-for="index in 2"
              :key="index"
              class="flex gap-3 rounded-lg border border-gitkut-lineSoft bg-gitkut-cardSoft p-3 shadow-inset"
            >
              <RetroSkeleton class="h-12 w-12 shrink-0" rounded="lg" />
              <div class="min-w-0 flex-1">
                <RetroSkeleton class="h-4 w-32" rounded="full" />
                <RetroSkeleton class="mt-3 h-16 w-full" rounded="lg" />
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-2 border-t border-gitkut-lineSoft pt-4 sm:flex-row">
            <RetroSkeleton class="h-11 flex-1" rounded="lg" />
            <div
              class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gitkut-line bg-gitkut-primary/20 px-4 text-gitkut-primary sm:w-36"
            >
              <Send aria-hidden="true" class="h-4 w-4" />
              <RetroSkeleton class="h-4 w-20" rounded="full" />
            </div>
          </div>
        </RetroCard>
      </section>

      <aside class="space-y-4 lg:col-span-3">
        <RetroCard title="Mood" eyebrow="status">
          <template #icon>
            <Sparkles aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <div class="space-y-3">
            <RetroSkeleton class="h-20 w-full" rounded="lg" />
            <RetroSkeleton class="h-20 w-full" rounded="lg" />
          </div>
        </RetroCard>

        <RetroCard title="Git Stats" eyebrow="profile pulse">
          <template #icon>
            <BarChart3 aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <div class="grid grid-cols-2 gap-3">
            <RetroSkeleton
              v-for="index in 4"
              :key="index"
              class="h-20 w-full"
              rounded="lg"
            />
          </div>
          <RetroSkeleton class="mt-3 h-12 w-full" rounded="lg" />
          <RetroSkeleton class="mt-2 h-12 w-full" rounded="lg" />
        </RetroCard>

        <RetroCard title="Developer Communities">
          <template #icon>
            <UsersRound aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <div class="flex flex-wrap gap-2">
            <RetroSkeleton class="h-7 w-24" rounded="full" />
            <RetroSkeleton class="h-7 w-20" rounded="full" />
            <RetroSkeleton class="h-7 w-28" rounded="full" />
            <RetroSkeleton class="h-7 w-24" rounded="full" />
          </div>
        </RetroCard>

        <RetroCard title="Trophy Case" eyebrow="git trophies">
          <template #icon>
            <Trophy aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <div class="flex flex-wrap gap-2">
            <RetroSkeleton class="h-7 w-24" rounded="full" />
            <RetroSkeleton class="h-7 w-28" rounded="full" />
            <RetroSkeleton class="h-7 w-20" rounded="full" />
          </div>
        </RetroCard>

        <RetroCard title="Octo-Ring" eyebrow="profile ring">
          <template #icon>
            <Orbit aria-hidden="true" class="h-5 w-5 text-gitkut-primary" />
          </template>

          <RetroSkeleton class="h-28 w-full" rounded="lg" />
        </RetroCard>
      </aside>
    </main>
  </div>
</template>
