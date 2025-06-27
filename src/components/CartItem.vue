<template>
  <div class="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
    <input
      type="checkbox"
      :value="item.id"
      :checked="isSelected"
      @change="$emit('toggle-select', item.id)"
      class="form-checkbox h-5 w-5 text-blue-600 rounded"
    />
    <img
      :src="item.imageUrl"
      :alt="item.name"
      class="w-20 h-20 object-cover rounded-lg bg-gray-200"
    />
    <div class="flex-grow">
      <div class="mb-1!">
        <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {{ item.displayCategory }}
        </span>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-1!">{{ item.name }}</h3>
      <p class="text-sm text-gray-600 mb-2!">年齡限制：{{ item.ageRestriction }}</p>
      <p class="text-2xl font-bold text-blue-600">NT$ {{ item.price.toLocaleString() }}</p>
    </div>
    <button
      @click="$emit('remove', item.id)"
      class="text-red-600 hover:text-red-800 p-2"
      title="刪除此項目"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/types/course'

interface Props {
  item: CartItem
  isSelected: boolean
}

interface Emits {
  (e: 'toggle-select', itemId: string): void
  (e: 'remove', itemId: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
