<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'

const { toastState, hideToast } = useToast()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <RouterView />

    <Toast
      :visible="toastState.visible"
      :type="toastState.type"
      :title="toastState.title"
      :message="toastState.message"
      @close="hideToast"
    />
  </div>
</template>
