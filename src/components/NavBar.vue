<template>
  <nav ref="navRef" class="bg-white shadow-lg flex justify-center relative">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
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
        <div class="md:hidden flex items-center">
          <!-- 漢堡選單按鈕 -->
          <button
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-blue-600 p-2 relative z-20"
            :class="{ 'text-blue-600': isMobileMenuOpen }"
          >
            <!-- 漢堡圖示 -->
            <div class="w-6 h-6 flex flex-col justify-center items-center gap-y-1">
              <span
                class="block w-5 h-0.5 bg-current transition-all duration-300"
                :class="{ 'rotate-45 translate-y-1.5': isMobileMenuOpen }"
              ></span>
              <span
                class="block w-5 h-0.5 bg-current transition-all duration-300"
                :class="{ 'opacity-0': isMobileMenuOpen }"
              ></span>
              <span
                class="block w-5 h-0.5 bg-current transition-all duration-300"
                :class="{ '-rotate-45 -translate-y-1.5': isMobileMenuOpen }"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- 手機版下拉選單 -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-show="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-10"
        >
          <div class="px-4 py-2 space-y-1">
            <RouterLink
              to="/"
              class="block px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'courses' }"
              @click="closeMobileMenu"
            >
              📚 課程列表
            </RouterLink>
            <RouterLink
              to="/cart"
              class="flex px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors items-center justify-between"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'cart' }"
              @click="closeMobileMenu"
            >
              <span class="flex items-center gap-2"> 🛒 購物車 </span>
              <span
                v-if="cartStore.totalItems > 0"
                class="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center"
              >
                {{ cartStore.totalItems }}
              </span>
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/counter'

const cartStore = useCartStore()
const isMobileMenuOpen = ref(false)
const navRef = ref<HTMLElement>()

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function handleClickOutside(event: Event) {
  if (navRef.value && !navRef.value.contains(event.target as Node)) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.router-link-active {
  color: #2563eb;
}
</style>
