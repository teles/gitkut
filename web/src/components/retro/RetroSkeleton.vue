<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    rounded?: "sm" | "md" | "lg" | "xl" | "full";
  }>(),
  {
    rounded: "md",
  },
);

const roundedClass = computed(
  () =>
    ({
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-2xl",
      full: "rounded-full",
    })[props.rounded],
);
</script>

<template>
  <span
    aria-hidden="true"
    class="block animate-pulse border border-gitkut-lineSoft bg-gradient-to-r from-gitkut-cardSoft via-white to-gitkut-bluePill shadow-inset"
    :class="roundedClass"
  />
</template>
