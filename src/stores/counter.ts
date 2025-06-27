import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Course, CartItem } from '@/types/course'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  function addToCart(course: Course) {
    const existingItem = items.value.find((item) => item.id === course.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...course, quantity: 1 })
    }
  }

  function removeFromCart(courseId: string) {
    const index = items.value.findIndex((item) => item.id === courseId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function removeSelectedItems(selectedIds: string[]) {
    items.value = items.value.filter((item) => !selectedIds.includes(item.id))
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    removeSelectedItems,
    clearCart,
  }
})
