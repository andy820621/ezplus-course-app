<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">課程列表</h1>

    <!-- 載入狀態 -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600">載入課程中...</span>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-500 text-xl mb-4">載入課程時發生錯誤</div>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <button
        @click="fetchCourses"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        重新載入
      </button>
    </div>

    <!-- 課程網格 -->
    <div
      v-else-if="courses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>

    <!-- 無課程狀態 -->
    <div v-else class="text-center py-12">
      <div class="text-6xl text-gray-300 mb-4">📚</div>
      <p class="text-xl text-gray-500">目前沒有課程</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CourseCard from '@/components/CourseCard.vue'
import type { Course } from '@/types/course'

const courses = ref<Course[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchCourses() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyGmoZukCQze0nw3UF-VX9ELODVy5Rs6CIQ1U-YbwNHfG3JIjGz4JThKAvWJB1P0qTg/exec',
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    console.log({ data })

    // 確保資料格式正確
    if (Array.isArray(data)) {
      courses.value = data.map((course: Record<string, unknown>, index: number) => ({
        id: (course.id as number) || index + 1,
        name: (course.name as string) || (course.courseName as string) || '未命名課程',
        status: (course.status as string) || (course.courseStatus as string) || '狀態未知',
        thumbnail: (course.thumbnail as string) || (course.image as string) || '',
        price: Number(course.price) || 0,
      }))
    } else {
      throw new Error('API 回傳的資料格式不正確')
    }
  } catch (err) {
    console.error('載入課程失敗:', err)
    error.value = err instanceof Error ? err.message : '載入課程時發生未知錯誤'

    // 如果 API 失敗，使用假資料作為展示
    courses.value = [
      {
        id: 1,
        name: 'Vue.js 從入門到精通',
        status: '開課中',
        thumbnail: '',
        price: 2999,
      },
      {
        id: 2,
        name: 'React 前端開發實戰',
        status: '即將開課',
        thumbnail: '',
        price: 3499,
      },
      {
        id: 3,
        name: 'Node.js 後端開發',
        status: '尚未開始',
        thumbnail: '',
        price: 4999,
      },
      {
        id: 4,
        name: 'TypeScript 完整指南',
        status: '開課中',
        thumbnail: '',
        price: 2499,
      },
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourses()
})
</script>
