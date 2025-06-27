<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/counter'

const cartStore = useCartStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 導航列 -->
    <nav class="bg-white shadow-lg flex justify-center">
      <div class="w-full mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- 左側標題 -->
          <h1 class="text-xl font-bold text-gray-800">
            <RouterLink to="/" class="text-gray-600 hover:text-blue-900 transition-colors">
              課程平台
            </RouterLink>
          </h1>

          <!-- 右側導航選單 -->
          <ul class="hidden md:flex gap-2 list-none">
            <li>
              <RouterLink
                to="/"
                class="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                :class="{ 'text-blue-600': $route.name === 'courses' }"
              >
                課程列表
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/cart"
                class="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
                :class="{ 'text-blue-600': $route.name === 'cart' }"
              >
                購物車
                <span
                  v-if="cartStore.totalItems > 0"
                  class="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center"
                >
                  {{ cartStore.totalItems }}
                </span>
              </RouterLink>
            </li>
          </ul>

          <!-- 手機版選單 -->
          <div class="md:hidden">
            <RouterLink to="/cart" class="relative text-gray-600 hover:text-blue-600 p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h14M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                ></path>
              </svg>
              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
              >
                {{ cartStore.totalItems }}
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <RouterView />
  </div>
</template>

<style scoped>
.router-link-active {
  color: #2563eb;
}
</style>
