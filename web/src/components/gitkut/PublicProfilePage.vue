<script setup lang="ts">
import { computed } from "vue";
import AboutCard from "./AboutCard.vue";
import CommunitiesCard from "./CommunitiesCard.vue";
import DevVibesCard from "./DevVibesCard.vue";
import FeaturedReposCard from "./FeaturedReposCard.vue";
import GitkutTopbar from "./GitkutTopbar.vue";
import MoodCard from "./MoodCard.vue";
import OctoRingCard from "./OctoRingCard.vue";
import ProfileCard from "./ProfileCard.vue";
import ScrapsCard from "./ScrapsCard.vue";
import StatsCard from "./StatsCard.vue";
import TrophyCaseCard from "./TrophyCaseCard.vue";
import type {
  GitkutBadge,
  GitkutCommunity,
  GitkutProfile,
  GitkutRepo,
  GitkutScrap,
  GitkutUser,
} from "../../types/gitkut";

const props = withDefaults(
  defineProps<{
    user: GitkutUser;
    repos: GitkutRepo[];
    scraps: GitkutScrap[];
    communities: GitkutCommunity[];
    badges: GitkutBadge[];
    profile?: GitkutProfile | null;
    authenticated?: boolean;
    loading?: boolean;
  }>(),
  {
    authenticated: false,
    loading: false,
    profile: null,
  },
);

defineEmits<{
  refresh: [];
  logout: [];
}>();

const mood = computed(() => props.profile?.mood ?? "Hacking");
const currentlyHackingOn = computed(
  () => props.profile?.currentlyHackingOn ?? props.repos[0]?.name ?? "gitkut",
);
const profileViews = computed(
  () => props.user.followers * 7 + props.repos.length * 23 + 200,
);
const profilePath = computed(() => `/${props.profile?.slug ?? props.user.username}`);
</script>

<template>
  <div class="min-h-screen bg-gitkut-bg text-gitkut-ink">
    <GitkutTopbar
      :authenticated="authenticated"
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
          :mood="mood"
          :currently-hacking-on="currentlyHackingOn"
          :profile-views="profileViews"
          :profile-path="profilePath"
        />
        <DevVibesCard />
      </aside>

      <section class="space-y-4 lg:col-span-6">
        <AboutCard :user="user" />
        <div id="repositories">
          <FeaturedReposCard :repos="repos" />
        </div>
        <div id="scrapbook">
          <ScrapsCard :scraps="scraps" :username="user.username" />
        </div>
      </section>

      <aside class="space-y-4 lg:col-span-3">
        <MoodCard :mood="mood" :currently-hacking-on="currentlyHackingOn" />
        <StatsCard :user="user" :repos="repos" />
        <div id="communities">
          <CommunitiesCard :communities="communities" />
        </div>
        <TrophyCaseCard :badges="badges" />
        <OctoRingCard :username="user.username" />
      </aside>
    </main>
  </div>
</template>
