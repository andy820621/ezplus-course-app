<template>
  <div class="min-h-screen bg-gray-50 w-screen flex justify-center">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8!">購物車</h1>

      <EmptyState
        v-if="cartStore.items.length === 0"
        icon="🛒"
        title="您的購物車目前是空的"
        description="快去選購您喜歡的課程吧！"
        action-text="前往課程列表"
        action-to="/"
      />

      <div v-else>
        <div class="mb-6! flex items-center gap-4">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="selection.selectAll.value"
              class="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <span class="ml-2! text-gray-700">全選</span>
          </label>
          <button
            v-if="selection.selectedCount.value > 0"
            @click="showDeleteConfirm"
            :disabled="isDeletingSelected"
            class="text-red-600 hover:text-red-800 font-medium flex items-center gap-2 transition-all"
            :class="{ 'opacity-50 cursor-not-allowed': isDeletingSelected }"
          >
            <svg
              v-if="isDeletingSelected"
              class="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
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

            {{
              isDeletingSelected ? '刪除中...' : `刪除所選項目 (${selection.selectedCount.value})`
            }}
          </button>
        </div>

        <div class="space-y-4 mb-8!">
          <CartItem
            v-for="item in cartStore.items"
            :key="item.id"
            :item="item"
            :is-selected="selection.isSelected(item.id)"
            @toggle-select="selection.toggleItem"
            @remove="cartStore.removeFromCart"
          />
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6!">
            <span class="text-xl font-semibold text-gray-800">
              總計金額 ({{ cartStore.totalItems }} 項課程)
            </span>
            <span class="text-xl font-bold text-blue-600">
              NT$ {{ cartStore.totalPrice.toLocaleString() }}
            </span>
          </div>

          <div class="flex justify-end">
            <button
              @click="showOrderConfirm"
              :disabled="isConfirmingOrder"
              class="w-auto min-w-[160px] md:min-w-[200px] bg-green-600 text-white py-3 md:py-4 px-6 rounded-lg text-lg md:text-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-3"
              :class="{ 'opacity-75 cursor-not-allowed': isConfirmingOrder }"
            >
              <!-- Loading Icon -->
              <svg
                v-if="isConfirmingOrder"
                class="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
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

              {{ isConfirmingOrder ? '處理中...' : '確認訂單' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/counter'
import { useSelection } from '@/composables/useSelection'
import { useToast } from '@/composables/useToast'
import CartItem from '@/components/CartItem.vue'
import EmptyState from '@/components/EmptyState.vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const selection = useSelection(cartItems)
const { showSuccess, showError } = useToast()

const isDeletingSelected = ref(false)
const isConfirmingOrder = ref(false)

async function showDeleteConfirm() {
  const confirmed = confirm(`確定要刪除 ${selection.selectedCount.value} 個選中的課程嗎？`)
  if (!confirmed) return

  isDeletingSelected.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 800))

    cartStore.removeSelectedItems(selection.selectedItems.value)
    selection.clearSelection()

    showSuccess('刪除成功', '已成功刪除選中的課程')
  } catch (error) {
    showError('刪除失敗', '請稍後再試')
    console.error('Delete failed:', error)
  } finally {
    isDeletingSelected.value = false
  }
}

async function showOrderConfirm() {
  const confirmed = confirm(`確定要下訂單嗎？總金額：NT$ ${cartStore.totalPrice.toLocaleString()}`)
  if (!confirmed) return

  isConfirmingOrder.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO：實際的訂單 API
    const orderAmount = cartStore.totalPrice
    const orderItems = cartStore.totalItems

    cartStore.clearCart()
    selection.clearSelection()

    showSuccess(
      '訂單成功！',
      `已成功建立訂單，共 ${orderItems} 項課程，總金額 NT$ ${orderAmount.toLocaleString()}`,
    )
  } catch (error) {
    showError('訂單失敗', '處理訂單時發生錯誤，請稍後再試')
    console.error('Order failed:', error)
  } finally {
    isConfirmingOrder.value = false
  }
}
</script>
