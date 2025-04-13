<template>
    <div class="user-profile">
      <h2 class="page-title">My Profile</h2>
      
      <!-- Profile Information -->
      <div class="profile-info" v-if="user">
        <i class="fas fa-user-circle profile-icon"></i>
        <h3>{{ userProfile.displayName || user.displayName || 'Anonymous User' }}</h3>
        <p>Email: {{ user.email }}</p>
        <p v-if="userProfile.phone">Phone: {{ userProfile.phone }}</p>
        <!-- Add more fields as needed -->
      </div>
      
      <!-- Order History Section -->
      <section class="order-history">
        <h3>Order History</h3>
        <div v-if="orders.length">
          <div v-for="order in orders" :key="order.id" class="order-item">
            <p><strong>Order ID:</strong> {{ order.id }}</p>
            <p>
              <strong>Date:</strong>
              {{ order.createdAt ? order.createdAt.toDate().toLocaleString() : 'N/A' }}
            </p>
            <p><strong>Total:</strong> ${{ order.total }}</p>
            <p><strong>Status:</strong> {{ order.status }}</p>
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
  import { doc, getDoc } from 'firebase/firestore'
  import { db } from '@/firebaseConfig'
  import { useUserData } from '@/composables/useUserData'
  import Wishlist from '@/views/Wishlist.vue' // Adjust path if needed
  
  const user = ref(null)
  const userProfile = ref({}) // To store additional user data from Firestore
  const { userOrders, loadOrders } = useUserData()
  
  // Listen for authentication changes and load orders/user profile when a user is logged in
  const auth = getAuth()
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = currentUser
      loadOrders() // Load orders for current user
      // Load additional user profile data from Firestore
      const docRef = doc(db, 'users', currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        userProfile.value = docSnap.data()
      }
    }
  })
  
  const orders = userOrders
  </script>