<template>
  <div class="w-screen flex justify-center">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8!">課程列表</h1>

      <!-- 載入狀態 -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">載入課程中...</span>
      </div>

      <!-- 錯誤狀態 -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 text-xl mb-4!">載入課程時發生錯誤</div>
        <p class="text-gray-600 mb-6!">{{ error }}</p>
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
      <EmptyState
        v-else
        icon="📚"
        title="目前沒有課程"
        description="課程即將上線，請稍後再來查看"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CourseCard from '@/components/CourseCard.vue'
import EmptyState from '@/components/EmptyState.vue'
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
      courses.value = data
    } else {
      throw new Error('API 回傳的資料格式不正確')
    }
  } catch (err) {
    console.error('載入課程失敗:', err)
    error.value = err instanceof Error ? err.message : '載入課程時發生未知錯誤'

    // 如果 API 失敗，使用假資料作為展示
    courses.value = [
      {
        id: '1758051268318220289',
        name: '狂美《久石讓的燦爛樂章》交響音樂會-2024再現',
        displayCategory: '音樂',
        imageUrl: 'https://s3.resource.opentix.life/upload/program/1710929296686xSXZ4TpVh3.jpeg',
        startDateTime: 1720000000,
        endDateTime: 1730000000,
        price: 2200,
        ageRestriction: '7歲以上',
        status: '已開始',
      },
      {
        id: '1784862638494830592',
        name: '2024 馬辛－龍之聲世界巡演台灣站',
        displayCategory: '音樂',
        imageUrl: 'https://s3.resource.opentix.life/upload/program/1714967180923XS2gISJhI3.jpeg',
        startDateTime: 1720000000,
        endDateTime: 1720000000,
        price: 2500,
        ageRestriction: '4歲以上',
        status: '已開始',
      },
      {
        id: '1783015237651550209',
        name: '音樂劇《跑跑殭丙仁》',
        displayCategory: '戲劇',
        imageUrl: 'https://s3.resource.opentix.life/upload/program/1715127950033jbYDDq1I6V.jpeg',
        startDateTime: 1720000000,
        endDateTime: 1730000000,
        price: 2000,
        ageRestriction: '6歲以上',
        status: '已結束',
      },
      {
        id: '1606151416662671362',
        name: '親子音樂劇《阿甯咕又闖禍了YA~》小兒子動畫劇場 ①',
        displayCategory: '親子',
        imageUrl: 'https://s3.resource.opentix.life/upload/program/17092736496549f700TXn8s.png',
        startDateTime: 1720000000,
        endDateTime: 1720000000,
        price: 1600,
        ageRestriction: '4歲以上',
        status: '尚未開始',
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
