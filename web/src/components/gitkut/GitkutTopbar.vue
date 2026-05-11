<script setup lang="ts">
import { LogIn, LogOut, RotateCcw, Share2 } from "lucide-vue-next";
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
  logout: [];
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
        <a class="text-3xl font-bold italic text-gitkut-primary" href="/"> Gitkut </a>

        <nav
          v-if="authenticated"
          class="flex flex-wrap items-center gap-1 text-sm font-bold text-gitkut-muted md:text-base"
          aria-label="Gitkut sections"
        >
          <a
            class="rounded px-2 py-1 text-gitkut-primary underline decoration-2 underline-offset-8"
            :href="username ? `/${username}` : '/'"
          >
            Profile
          </a>
          <a
            class="rounded px-2 py-1 hover:bg-white/40 hover:text-gitkut-primary"
            href="#repositories"
          >
            Repositories
          </a>
          <a
            class="rounded px-2 py-1 hover:bg-white/40 hover:text-gitkut-primary"
            href="#scrapbook"
          >
            Scrapbook
          </a>
          <a
            class="rounded px-2 py-1 hover:bg-white/40 hover:text-gitkut-primary"
            href="#communities"
          >
            Communities
          </a>
        </nav>
      </div>

      <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
        <RetroButton
          v-if="authenticated"
          variant="ghost"
          size="sm"
          :disabled="loading"
          @click="$emit('refresh')"
        >
          <RotateCcw class="h-4 w-4" :class="{ 'animate-spin': loading }" />
          Refresh
        </RetroButton>

        <RetroButton v-if="authenticated" size="sm" :disabled="loading">
          <Share2 class="h-4 w-4" />
          Share Profile
        </RetroButton>

        <RetroButton
          v-if="authenticated"
          variant="ghost"
          size="sm"
          :disabled="loading"
          @click="$emit('logout')"
        >
          <LogOut class="h-4 w-4" />
          Sign out
        </RetroButton>

        <RetroButton v-else size="sm" @click="$emit('login')">
          <LogIn class="h-4 w-4" />
          Sign in
        </RetroButton>
      </div>
    </div>
  </header>
</template>
