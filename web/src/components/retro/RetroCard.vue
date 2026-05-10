<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    eyebrow?: string;
    compact?: boolean;
  }>(),
  {
    title: "",
    eyebrow: "",
    compact: false,
  },
);
</script>

<template>
  <section
    class="gitkut-card-frame"
    :class="compact ? 'p-3' : 'p-4'"
  >
    <header
      v-if="title || eyebrow || $slots.header || $slots.icon || $slots.actions"
      class="gitkut-card-header"
    >
      <slot name="icon" />

      <slot name="header">
        <div class="min-w-0 flex-1">
          <p
            v-if="eyebrow"
            class="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-gitkut-muted"
          >
            {{ eyebrow }}
          </p>
          <h2
            v-if="title"
            class="truncate text-[17px] font-bold leading-6 text-gitkut-ink"
          >
            {{ title }}
          </h2>
        </div>
      </slot>

      <div v-if="$slots.actions" class="ml-auto">
        <slot name="actions" />
      </div>
    </header>

    <slot />
  </section>
</template>
