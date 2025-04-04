// src/composables/useWishlist.js
import { ref } from 'vue'

const wishlist = ref([])

function toggleWishlistItem(item) {
  const index = wishlist.value.findIndex((w) => w.id === item.id)
  if (index > -1) {
    wishlist.value.splice(index, 1)
  } else {
    wishlist.value.push(item)
  }
}

function isInWishlist(item) {
  return wishlist.value.some((w) => w.id === item.id)
}

export function useWishlist() {
  return {
    wishlist,
    toggleWishlistItem,
    isInWishlist
  }
}
