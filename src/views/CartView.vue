<template>
  <div class="min-h-screen bg-gray-50 w-screen flex justify-center">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8!">購物車</h1>

      <!-- 空購物車狀態 -->
      <EmptyState
        v-if="cartStore.items.length === 0"
        icon="🛒"
        title="您的購物車目前是空的"
        description="快去選購您喜歡的課程吧！"
        action-text="前往課程列表"
        action-to="/"
      />

      <!-- 購物車項目 -->
      <div v-else>
        <!-- 全選/取消全選 -->
        <div class="mb-6! flex items-center gap-4">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="selection.selectAll.value"
              class="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <span class="ml-2 text-gray-700">全選</span>
          </label>
          <button
            v-if="selection.selectedCount.value > 0"
            @click="removeSelected"
            class="text-red-600 hover:text-red-800 font-medium"
          >
            刪除所選項目 ({{ selection.selectedCount.value }})
          </button>
        </div>

        <!-- 購物車項目列表 -->
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

        <!-- 總計和確認按鈕 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6!">
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
import { computed } from 'vue'
import { useCartStore } from '@/stores/counter'
import { useSelection } from '@/composables/useSelection'
import CartItem from '@/components/CartItem.vue'
import EmptyState from '@/components/EmptyState.vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const selection = useSelection(cartItems)

function removeSelected() {
  if (selection.selectedCount.value > 0) {
    cartStore.removeSelectedItems(selection.selectedItems.value)
    selection.clearSelection()
  }
}

function confirmOrder() {
  alert(`訂單確認！總金額：NT$ ${cartStore.totalPrice.toLocaleString()}`)
  cartStore.clearCart()
  selection.clearSelection()
}
</script>
