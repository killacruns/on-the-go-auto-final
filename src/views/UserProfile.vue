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
            <p>
              <strong>Date:</strong>
              <!-- If createdAt is a Firestore Timestamp, convert it to a JavaScript Date -->
              {{ order.createdAt ? order.createdAt.toDate().toLocaleString() : 'N/A' }}
            </p>
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
  import { ref, onMounted } from 'vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { collection, query, where, onSnapshot } from 'firebase/firestore'
  import { db } from '@/firebaseConfig'
  import Wishlist from '@/views/Wishlist.vue' // Adjust path as necessary
  
  const user = ref(null)
  const orders = ref([])
  
  const auth = getAuth()
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser
      loadOrders(currentUser.uid)
    }
  })
  
  // Fetch and listen for real-time updates for orders associated with the current user
  function loadOrders(userId) {
    const ordersQuery = query(collection(db, 'orders'), where('userId', '==', userId))
    onSnapshot(ordersQuery, (snapshot) => {
      orders.value = []
      snapshot.forEach((doc) => {
        orders.value.push({ id: doc.id, ...doc.data() })
      })
    }, (error) => {
      console.error("Error fetching orders:", error)
    })
  }
  </script>
  