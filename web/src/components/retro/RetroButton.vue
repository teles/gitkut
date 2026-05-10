<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    block?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "primary",
    size: "md",
    block: false,
    disabled: false,
    type: "button",
  },
);

const classes = computed(() => [
  "gitkut-focus inline-flex items-center justify-center gap-2 rounded-lg border font-mono font-bold uppercase tracking-[0.04em] transition",
  props.block ? "w-full" : "",
  props.size === "sm" ? "min-h-8 px-3 text-[11px]" : "min-h-10 px-4 text-xs",
  props.disabled ? "cursor-not-allowed opacity-60" : "active:translate-y-px",
  props.variant === "primary"
    ? "border-gitkut-primaryDark bg-gitkut-primary text-white shadow-retro hover:bg-gitkut-primaryDark"
    : "",
  props.variant === "secondary"
    ? "border-gitkut-pink bg-white text-gitkut-primary shadow-retro hover:bg-gitkut-pinkSoft"
    : "",
  props.variant === "ghost"
    ? "border-gitkut-line bg-white text-gitkut-muted hover:bg-gitkut-cardSoft"
    : "",
]);
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
