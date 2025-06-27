<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <!-- 課程縮圖 -->
    <div class="aspect-video relative overflow-hidden bg-gray-200">
      <img
        v-if="course.imageUrl"
        :src="course.imageUrl"
        :alt="course.name"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <!-- 課程狀態標籤 -->
      <div class="absolute top-4 right-4">
        <span :class="statusClasses" class="px-3 py-1 rounded-full text-sm font-medium">
          {{ statusText }}
        </span>
      </div>
    </div>

    <!-- 課程資訊 -->
    <div class="p-6">
      <div class="mb-2!">
        <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {{ course.displayCategory }}
        </span>
      </div>

      <h3 class="text-xl font-semibold text-gray-800 mb-2! line-clamp-2">
        {{ course.name }}
      </h3>

      <div class="text-sm text-gray-600 mb-4!">
        <p>年齡限制：{{ course.ageRestriction }}</p>
      </div>

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
  // 根據需求：開課狀態「尚未開始」時不能加入購物車
  return props.course.status !== '尚未開始'
})

const statusClasses = computed(() => {
  switch (props.course.status) {
    case '已開始':
      return 'bg-green-100 text-green-800'
    case '尚未開始':
      return 'bg-gray-100 text-gray-800'
    case '已結束':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const statusText = computed(() => {
  return props.course.status || '狀態未知'
})

const buttonClasses = computed(() => {
  if (canAddToCart.value) {
    return 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition-colors'
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
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
