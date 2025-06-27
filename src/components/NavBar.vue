<template>
  <nav class="bg-white shadow-lg flex justify-center">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <h1 class="text-xl font-bold text-gray-800">
          <RouterLink to="/" class="text-gray-600 hover:text-blue-900 transition-colors">
            課程平台
          </RouterLink>
        </h1>

        <ul class="hidden md:flex items-center list-none">
          <li>
            <RouterLink
              to="/"
              class="text-gray-600 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-md"
              :class="{ 'text-blue-600': $route.name === 'courses' }"
            >
              課程列表
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/cart"
              class="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 px-3 py-2 rounded-md"
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
        <div class="md:hidden flex items-center gap-4">
          <RouterLink
            to="/"
            class="text-gray-600 hover:text-blue-600 p-2 text-sm"
            :class="{ 'text-blue-600': $route.name === 'courses' }"
          >
            課程
          </RouterLink>
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
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/counter'

const cartStore = useCartStore()
</script>

<style scoped>
.router-link-active {
  color: #2563eb;
}
</style>
