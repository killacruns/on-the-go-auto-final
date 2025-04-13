// src/composables/useUserData.js
import { ref } from 'vue'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { getAuth } from 'firebase/auth'

export function useUserData() {
  const userOrders = ref([])

  // Function to load orders for the currently authenticated user
  function loadOrders() {
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (!currentUser) return

    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', currentUser.uid)
    )
    onSnapshot(ordersQuery, (snapshot) => {
      userOrders.value = []
      snapshot.forEach(doc => {
        userOrders.value.push({ id: doc.id, ...doc.data() })
      })
    }, (error) => {
      console.error("Error fetching orders:", error)
    })
  }

  return { userOrders, loadOrders }
}
