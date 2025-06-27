import { ref, computed, type Ref } from 'vue'

export function useSelection<T extends { id: string }>(items: Ref<T[]>) {
  const selectedItems = ref<string[]>([])

  const selectAll = computed({
    get: () => selectedItems.value.length === items.value.length && items.value.length > 0,
    set: (value: boolean) => {
      if (value) {
        selectedItems.value = items.value.map((item) => item.id)
      } else {
        selectedItems.value = []
      }
    },
  })

  const selectedCount = computed(() => selectedItems.value.length)

  function toggleItem(itemId: string) {
    const index = selectedItems.value.indexOf(itemId)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    } else {
      selectedItems.value.push(itemId)
    }
  }

  function isSelected(itemId: string) {
    return selectedItems.value.includes(itemId)
  }

  function clearSelection() {
    selectedItems.value = []
  }

  function selectItems(itemIds: string[]) {
    selectedItems.value = [...itemIds]
  }

  return {
    selectedItems: selectedItems as Ref<string[]>,
    selectAll,
    selectedCount,
    toggleItem,
    isSelected,
    clearSelection,
    selectItems,
  }
}
