<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- 課程縮圖 -->
    <div class="aspect-video relative overflow-hidden">
      <img :src="course.thumbnail" :alt="course.name" class="w-full h-full object-cover" />
      <!-- 課程狀態標籤 -->
      <div class="absolute top-4 right-4">
        <span :class="statusClasses" class="px-3 py-1 rounded-full text-sm font-medium">
          {{ statusText }}
        </span>
      </div>
    </div>

    <!-- 課程資訊 -->
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
        {{ course.name }}
      </h3>

      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-blue-600">NT$ {{ course.price.toLocaleString() }}</div>

        <button
          @click="addToCart"
          :disabled="!canAddToCart"
          :class="buttonClasses"
          class="px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Course } from '@/types/course'
import { useCartStore } from '@/stores/counter'

interface Props {
  course: Course
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const canAddToCart = computed(() => {
  return props.course.status === '開課中' || props.course.status === '即將開課'
})

const statusClasses = computed(() => {
  switch (props.course.status) {
    case '開課中':
      return 'bg-green-100 text-green-800'
    case '即將開課':
      return 'bg-yellow-100 text-yellow-800'
    case '尚未開始':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const statusText = computed(() => {
  return props.course.status || '狀態未知'
})

const buttonClasses = computed(() => {
  if (canAddToCart.value) {
    return 'bg-blue-600 text-white hover:bg-blue-700'
  } else {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }
})

const buttonText = computed(() => {
  return canAddToCart.value ? '加入購物車' : '無法購買'
})

function addToCart() {
  if (canAddToCart.value) {
    cartStore.addToCart(props.course)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
