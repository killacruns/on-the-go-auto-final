<template>
    <div class="user-profile">
      <h2 class="page-title">My Profile</h2>
      <!-- Profile Information -->
      <div class="profile-info" v-if="user">
        <i class="fas fa-user-circle profile-icon"></i>
        <h3>{{ user.displayName || 'Anonymous User' }}</h3>
        <p>Email: {{ user.email }}</p>
      </div>
      
      <!-- Order History Section -->
      <section class="order-history">
        <h3>Order History</h3>
        <div v-if="orders.length">
          <div v-for="order in orders" :key="order.id" class="order-item">
            <p><strong>Order ID:</strong> {{ order.id }}</p>
            <p><strong>Date:</strong> {{ order.date }}</p>
            <p><strong>Total:</strong> ${{ order.total }}</p>
          </div>
        </div>
        <p v-else>You have no orders yet.</p>
      </section>
      
      <!-- Wishlist Section -->
      <section class="wishlist-section">
        <h3>My Wishlist</h3>
        <Wishlist />
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import Wishlist from '@/views/Wishlist.vue' // Adjust the path as necessary
  
  const user = ref(null)
  const auth = getAuth()
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser
    }
  })
  
  // Static order data for now; later replace with dynamic data from your backend.
  const orders = ref([
    { id: '001', date: '2023-04-01', total: 150 },
    { id: '002', date: '2023-03-15', total: 85 }
  ])
  </script>
  