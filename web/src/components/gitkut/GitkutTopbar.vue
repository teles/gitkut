<script setup lang="ts">
import { LogIn, RefreshCw, Search, Share2 } from "lucide-vue-next";
import RetroButton from "../retro/RetroButton.vue";

withDefaults(
  defineProps<{
    authenticated?: boolean;
    loading?: boolean;
    username?: string;
  }>(),
  {
    authenticated: false,
    loading: false,
    username: "",
  },
);

defineEmits<{
  login: [];
  refresh: [];
}>();
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-gitkut-line bg-gradient-to-b from-gitkut-topbar to-gitkut-topbarDeep"
  >
    <div
      class="mx-auto flex min-h-16 max-w-gitkut flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6"
    >
      <div class="flex flex-wrap items-center gap-5">
        <a class="text-3xl font-bold italic text-gitkut-primary" href="#">
          Gitkut
        </a>

        <nav
          class="flex flex-wrap items-center gap-1 text-sm font-bold text-gitkut-muted md:text-base"
          aria-label="Gitkut sections"
        >
          <a class="rounded px-2 py-1 text-gitkut-primary underline decoration-2 underline-offset-8" href="#">
            Profile
          </a>
          <a class="rounded px-2 py-1 hover:bg-white/40 hover:text-gitkut-primary" href="#">
            Repositories
          </a>
          <a class="rounded px-2 py-1 hover:bg-white/40 hover:text-gitkut-primary" href="#">
            Scrapbook
          </a>
          <a class="rounded px-2 py-1 hover:bg-white/40 hover:text-gitkut-primary" href="#">
            Communities
          </a>
        </nav>
      </div>

      <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label class="relative block">
          <span class="sr-only">Search Gitkut</span>
          <Search
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gitkut-muted"
          />
          <input
            class="gitkut-focus h-10 w-full rounded-lg border border-gitkut-line bg-white/90 pl-9 pr-3 text-sm text-gitkut-ink shadow-inset placeholder:text-gitkut-softText sm:w-56"
            placeholder="Search Gitkut..."
            type="search"
          />
        </label>

        <RetroButton
          v-if="authenticated"
          variant="ghost"
          size="sm"
          :disabled="loading"
          @click="$emit('refresh')"
        >
          <RefreshCw class="h-4 w-4" :class="{ 'animate-spin': loading }" />
          Refresh
        </RetroButton>

        <RetroButton v-if="authenticated" size="sm">
          <Share2 class="h-4 w-4" />
          Share Profile
        </RetroButton>

        <RetroButton v-else size="sm" @click="$emit('login')">
          <LogIn class="h-4 w-4" />
          Enter
        </RetroButton>
      </div>
    </div>
  </header>
</template>
