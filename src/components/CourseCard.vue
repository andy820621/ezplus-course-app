<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
      <div class="absolute top-4 right-4">
        <span :class="statusClasses" class="px-3 py-1 rounded-full text-sm font-medium">
          {{ statusText }}
        </span>
      </div>
    </div>

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

      <div class="flex items-center justify-between gap-1 mt-8!">
        <div class="text-xl font-bold text-blue-600">NT$ {{ course.price.toLocaleString() }}</div>

        <button
          @click="addToCart"
          :disabled="!canAddToCart || isLoading || isInCart"
          :class="buttonClasses"
          class="px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
        >
          <svg v-if="isLoading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
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

          <svg
            v-if="isSuccess"
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>

          <svg
            v-else-if="isInCart"
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>

          <svg
            v-else-if="canAddToCart"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h14"
            ></path>
          </svg>

          <span>{{ buttonText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Course } from '@/types/course'
import { useCartStore } from '@/stores/counter'
import { useToast } from '@/composables/useToast'

interface Props {
  course: Course
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const { showSuccess, showError } = useToast()

const isLoading = ref(false)
const isSuccess = ref(false)

const canAddToCart = computed(() => {
  if (props.course.status === '尚未開始') return false

  const isInCart = cartStore.items.some((item) => item.id === props.course.id)
  if (isInCart) return false

  return true
})

const isInCart = computed(() => {
  return cartStore.items.some((item) => item.id === props.course.id)
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
  if (isSuccess.value) {
    return 'bg-green-600 text-white cursor-default'
  }
  if (isInCart.value) {
    return 'bg-gray-400 text-white cursor-default'
  }
  if (isLoading.value) {
    return 'bg-blue-500 text-white cursor-wait'
  }
  if (canAddToCart.value) {
    return 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition-colors'
  } else {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }
})

const buttonText = computed(() => {
  if (isLoading.value) return '加入中...'
  if (isSuccess.value) return '已加入'
  if (isInCart.value) return '已加入'
  if (props.course.status === '尚未開始') return '尚未開始'
  return canAddToCart.value ? '加入購物車' : '無法購買'
})

async function addToCart() {
  if (!canAddToCart.value || isLoading.value || isSuccess.value || isInCart.value) return

  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 800))

    // TODO：實際的 API 呼叫
    // 直接加入購物車
    cartStore.addToCart(props.course)

    isSuccess.value = true
    showSuccess('加入成功！', `「${props.course.name}」已加入購物車`)

    setTimeout(() => {
      isSuccess.value = false
    }, 1000)
  } catch (error) {
    showError('加入失敗', '請稍後再試')
    console.error('Add to cart failed:', error)
  } finally {
    isLoading.value = false
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
