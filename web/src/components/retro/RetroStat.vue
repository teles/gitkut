<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  hint?: string;
}>();
</script>

<template>
  <div
    class="rounded-lg border border-gitkut-line bg-gradient-to-b from-white to-gitkut-cardSoft p-3 text-center shadow-inset"
  >
    <strong class="block text-2xl font-bold leading-7 text-gitkut-primary">
      {{ value }}
    </strong>
    <span class="mt-1 block text-xs font-medium text-gitkut-muted">
      {{ label }}
    </span>
    <span v-if="hint" class="mt-1 block text-[11px] text-gitkut-softText">
      {{ hint }}
    </span>
  </div>
</template>
