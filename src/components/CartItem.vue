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
      @click="handleRemove"
      :disabled="isDeleting"
      class="text-red-600 hover:text-red-800 p-2 transition-all relative"
      :class="{ 'opacity-50 cursor-not-allowed': isDeleting }"
      :title="isDeleting ? '刪除中...' : '刪除此項目'"
    >
      <!-- Loading Icon -->
      <svg v-if="isDeleting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <!-- Delete Icon -->
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { ref } from 'vue'
import type { CartItem } from '@/types/course'
import { useToast } from '@/composables/useToast'

interface Props {
  item: CartItem
  isSelected: boolean
}

interface Emits {
  (e: 'toggle-select', itemId: string): void
  (e: 'remove', itemId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { showSuccess, showError } = useToast()

const isDeleting = ref(false)

async function handleRemove() {
  const confirmed = confirm(`確定要刪除「${props.item.name}」嗎？`)
  if (!confirmed) return

  isDeleting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 800))

    emit('remove', props.item.id)
    showSuccess('刪除成功', `已刪除「${props.item.name}」`)
  } catch (error) {
    showError('刪除失敗', '請稍後再試')
    console.error('Delete item failed:', error)
  } finally {
    isDeleting.value = false
  }
}
</script>
