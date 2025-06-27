<template>
  <div class="min-h-screen bg-gray-50 w-screen flex justify-center">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8!">購物車</h1>

      <!-- 空購物車狀態 -->
      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <div class="text-6xl text-gray-300 mb-4">🛒</div>
        <p class="text-xl text-gray-500 mb-6">您的購物車目前是空的</p>
        <router-link
          to="/"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          前往課程列表
        </router-link>
      </div>

      <!-- 購物車項目 -->
      <div v-else>
        <!-- 全選/取消全選 -->
        <div class="mb-6 flex items-center gap-4">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
              class="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <span class="ml-2 text-gray-700">全選</span>
          </label>
          <button
            v-if="selectedItems.length > 0"
            @click="removeSelected"
            class="text-red-600 hover:text-red-800 font-medium"
          >
            刪除所選項目 ({{ selectedItems.length }})
          </button>
        </div>

        <!-- 購物車項目列表 -->
        <div class="space-y-4 mb-8">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="bg-white rounded-lg shadow-md p-6 flex items-center gap-4"
          >
            <input
              type="checkbox"
              :value="item.id"
              v-model="selectedItems"
              class="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <img
              :src="item.imageUrl"
              :alt="item.name"
              class="w-20 h-20 object-cover rounded-lg bg-gray-200"
            />
            <div class="flex-grow">
              <div class="mb-1">
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {{ item.displayCategory }}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ item.name }}</h3>
              <p class="text-sm text-gray-600 mb-2">年齡限制：{{ item.ageRestriction }}</p>
              <p class="text-2xl font-bold text-blue-600">NT$ {{ item.price.toLocaleString() }}</p>
            </div>
            <button
              @click="cartStore.removeFromCart(item.id)"
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
        </div>

        <!-- 總計和確認按鈕 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6">
            <span class="text-xl font-semibold text-gray-800">
              總計金額 ({{ cartStore.totalItems }} 項課程)
            </span>
            <span class="text-3xl font-bold text-blue-600">
              NT$ {{ cartStore.totalPrice.toLocaleString() }}
            </span>
          </div>
          <button
            @click="confirmOrder"
            class="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors"
          >
            確認訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/counter'

const cartStore = useCartStore()
const selectedItems = ref<string[]>([])

const selectAll = computed({
  get: () => selectedItems.value.length === cartStore.items.length && cartStore.items.length > 0,
  set: (value: boolean) => {
    if (value) {
      selectedItems.value = cartStore.items.map((item) => item.id)
    } else {
      selectedItems.value = []
    }
  },
})

function toggleSelectAll() {
  // 已在 computed setter 中處理
}

function removeSelected() {
  if (selectedItems.value.length > 0) {
    cartStore.removeSelectedItems(selectedItems.value)
    selectedItems.value = []
  }
}

function confirmOrder() {
  alert(`訂單確認！總金額：NT$ ${cartStore.totalPrice.toLocaleString()}`)
  cartStore.clearCart()
  selectedItems.value = []
}
</script>
