<template>
    <div class="wishlist-page">
      <h2 class="page-title">My Wishlist</h2>
  
      <div v-if="wishlist.length" class="wishlist-grid">
        <div 
          v-for="(item, index) in wishlist" 
          :key="item.id" 
          class="wishlist-card"
        >
          <img :src="item.image" :alt="item.name" class="wishlist-image" />
          <h4 class="wishlist-item-name">{{ item.name }}</h4>
          <p class="wishlist-item-price">$ {{ item.price }}</p>
          <router-link :to="getItemLink(item)" class="btn-view">View Details</router-link>
          <button class="btn-remove" @click="removeFromWishlist(item)">Remove</button>
        </div>
      </div>
      <p v-else class="empty-wishlist">Your wishlist is empty.</p>
    </div>
  </template>
  
  <script setup>
  import { useWishlist } from '@/composables/useWishlist'
  import { computed } from 'vue'
  
  const { wishlist, toggleWishlistItem } = useWishlist()
  
  // Optionally, define logic to create a link based on whether it's a part or mechanic.
  function getItemLink(item) {
    // Example: If type is 'spare', link to /parts/:id; if type is 'mechanic', link to /mechanic-details/:id
    if (item.type === 'mechanic') {
      return `/mechanic-details/${item.id}`
    }
    // default to spare part
    return `/parts/${item.id}`
  }
  
  function removeFromWishlist(item) {
    toggleWishlistItem(item)
  }
  </script>