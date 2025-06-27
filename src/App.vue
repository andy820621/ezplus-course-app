<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 導航列 -->
    <NavBar />

    <!-- 主要內容 -->
    <RouterView />
  </div>
</template>
