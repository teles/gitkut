<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    tone?: "pink" | "blue" | "yellow" | "gray";
  }>(),
  {
    tone: "blue",
  },
);

const classes = computed(() => [
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold leading-none",
  props.tone === "pink"
    ? "border-gitkut-pink bg-gitkut-pinkSoft text-gitkut-primaryDark"
    : "",
  props.tone === "blue"
    ? "border-gitkut-line bg-gitkut-bluePill text-gitkut-muted"
    : "",
  props.tone === "yellow"
    ? "border-gitkut-yellowLine bg-gitkut-yellow text-[#66561c]"
    : "",
  props.tone === "gray"
    ? "border-gitkut-lineSoft bg-white text-gitkut-softText"
    : "",
]);
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
