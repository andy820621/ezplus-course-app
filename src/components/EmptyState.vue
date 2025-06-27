<template>
  <div class="text-center py-12">
    <div class="text-6xl text-gray-300 mb-4!">
      <slot name="icon">{{ icon }}</slot>
    </div>

    <h3 class="text-xl font-semibold text-gray-600 mb-2!">
      {{ title }}
    </h3>

    <p class="text-gray-500 mb-6!" v-if="description">
      {{ description }}
    </p>

    <div v-if="$slots.action">
      <slot name="action"></slot>
    </div>
    <RouterLink
      v-else-if="actionText && actionTo"
      :to="actionTo"
      class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {{ actionText }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  icon?: string
  title: string
  description?: string
  actionText?: string
  actionTo?: string
}

withDefaults(defineProps<Props>(), {
  icon: '📋',
})
</script>
