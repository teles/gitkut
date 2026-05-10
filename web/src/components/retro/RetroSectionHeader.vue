<script setup lang="ts">
defineProps<{
  title: string;
  eyebrow?: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <slot name="icon" />
    <div class="min-w-0">
      <p
        v-if="eyebrow"
        class="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-gitkut-muted"
      >
        {{ eyebrow }}
      </p>
      <h2 class="truncate text-[17px] font-bold leading-6 text-gitkut-ink">
        {{ title }}
      </h2>
    </div>
  </div>
</template>
