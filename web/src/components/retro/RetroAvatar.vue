<script setup lang="ts">
import { computed } from "vue";
import { getInitials } from "../../utils/gitkutDisplay";

const props = withDefaults(
  defineProps<{
    src?: string | null;
    alt: string;
    name?: string;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    src: null,
    name: "",
    size: "md",
  },
);

const sizeClass = computed(() => {
  return {
    sm: "h-12 w-12 rounded-lg text-sm",
    md: "h-20 w-20 rounded-xl text-xl",
    lg: "h-32 w-32 rounded-2xl text-3xl",
  }[props.size];
});

const initials = computed(() => getInitials(props.name || props.alt) || "GK");
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    :class="[
      sizeClass,
      'border-2 border-gitkut-pink bg-gitkut-cardSoft object-cover shadow-retro',
    ]"
  />
  <div
    v-else
    :class="[
      sizeClass,
      'grid place-items-center border-2 border-gitkut-pink bg-gradient-to-br from-gitkut-pinkSoft to-gitkut-bluePill font-mono font-bold text-gitkut-primary shadow-retro',
    ]"
    role="img"
    :aria-label="alt"
  >
    {{ initials }}
  </div>
</template>
