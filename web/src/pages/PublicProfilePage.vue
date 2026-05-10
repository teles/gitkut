<script setup lang="ts">
import { computed } from "vue";
import AboutCard from "../components/gitkut/AboutCard.vue";
import CommunitiesCard from "../components/gitkut/CommunitiesCard.vue";
import FeaturedReposCard from "../components/gitkut/FeaturedReposCard.vue";
import GitkutTopbar from "../components/gitkut/GitkutTopbar.vue";
import MoodCard from "../components/gitkut/MoodCard.vue";
import OctoRingCard from "../components/gitkut/OctoRingCard.vue";
import ProfileCard from "../components/gitkut/ProfileCard.vue";
import ScrapsCard from "../components/gitkut/ScrapsCard.vue";
import StatsCard from "../components/gitkut/StatsCard.vue";
import TrophyCaseCard from "../components/gitkut/TrophyCaseCard.vue";
import type {
  GitkutBadge,
  GitkutCommunity,
  GitkutRepo,
  GitkutScrap,
  GitkutUser,
} from "../types/gitkut";

const props = withDefaults(
  defineProps<{
    user: GitkutUser;
    repos: GitkutRepo[];
    scraps: GitkutScrap[];
    communities: GitkutCommunity[];
    badges: GitkutBadge[];
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

defineEmits<{
  refresh: [];
  logout: [];
}>();

const currentlyHackingOn = computed(() => props.repos[0]?.name ?? "gitkut");
const profileViews = computed(
  () => props.user.followers * 7 + props.repos.length * 23 + 200,
);
</script>

<template>
  <div class="min-h-screen bg-gitkut-bg text-gitkut-ink">
    <GitkutTopbar
      authenticated
      :loading="loading"
      :username="user.username"
      @refresh="$emit('refresh')"
      @logout="$emit('logout')"
    />

    <main
      class="mx-auto grid max-w-gitkut grid-cols-1 gap-4 px-4 py-5 md:px-6 lg:grid-cols-12"
    >
      <aside class="space-y-4 lg:col-span-3">
        <ProfileCard
          :user="user"
          mood="Hacking"
          :currently-hacking-on="currentlyHackingOn"
          :profile-views="profileViews"
        />
      </aside>

      <section class="space-y-4 lg:col-span-6">
        <AboutCard :user="user" />
        <FeaturedReposCard :repos="repos" />
        <ScrapsCard :scraps="scraps" :username="user.username" />
      </section>

      <aside class="space-y-4 lg:col-span-3">
        <MoodCard mood="Hacking" :currently-hacking-on="currentlyHackingOn" />
        <StatsCard :user="user" :repos="repos" />
        <CommunitiesCard :communities="communities" />
        <TrophyCaseCard :badges="badges" />
        <OctoRingCard :username="user.username" />
      </aside>
    </main>
  </div>
</template>
