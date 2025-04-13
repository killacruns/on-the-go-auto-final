<template>
  <div class="checkout-page">
    <h2 class="page-title">Checkout</h2>

    <!-- Progress Indicator -->
    <div class="checkout-progress">
      <span :class="{ active: currentStep === 1 }">Review Order</span>
      <span :class="{ active: currentStep === 2 }">Shipping Information</span>
    </div>

    <!-- Order Summary (Step 1) -->
    <div v-if="cart.items.length && currentStep === 1" class="order-summary">
      <h3>Order Summary</h3>
      <div class="order-items">
        <div v-for="(item, index) in cart.items" :key="item.id" class="order-item">
          <img :src="item.image" :alt="item.name" class="order-item-img" />
          <div class="order-item-details">
            <h4>{{ item.name }}</h4>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Price: ${{ item.price }}</p>
            <p>Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="order-total">
        <h3>Total: ${{ total }}</h3>
      </div>
      <button class="btn next-btn" @click="goToShipping">Next: Shipping Information</button>
    </div>

    <!-- Checkout Form (Step 2) -->
    <div v-if="cart.items.length && currentStep === 2" class="checkout-form">
      <h3>Shipping Information</h3>
      <form @submit.prevent="placeOrder">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" v-model="shippingInfo.name" type="text" required />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input id="address" v-model="shippingInfo.address" type="text" required />
          <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="shippingInfo.email" type="email" required />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn place-order-btn">Place Order</button>
          <button type="button" class="btn back-btn" @click="goBackToSummary">← Back to Order Summary</button>
        </div>
      </form>
    </div>

    <!-- Order Confirmation -->
    <div v-if="orderPlaced" class="order-confirmation">
      <p>Your order has been placed successfully!</p>
    </div>

    <!-- If cart is empty -->
    <p v-if="!cart.items.length && !orderPlaced" class="empty-cart">
      Your cart is empty.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/cart'
import { db, auth } from '@/firebaseConfig'
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore'

const cart = useCartStore()
const currentStep = ref(1)
const orderPlaced = ref(false)
const shippingInfo = ref({
  name: '',
  address: '',
  email: ''
})
const errors = ref({
  name: '',
  address: '',
  email: ''
})
const total = computed(() => cart.total.toFixed(2))

function goToShipping() {
  currentStep.value = 2
}

function goBackToSummary() {
  currentStep.value = 1
}

function validateForm() {
  let valid = true
  errors.value = { name: '', address: '', email: '' }
  if (!shippingInfo.value.name.trim()) {
    errors.value.name = 'Name is required'
    valid = false
  }
  if (!shippingInfo.value.address.trim()) {
    errors.value.address = 'Address is required'
    valid = false
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(shippingInfo.value.email)) {
    errors.value.email = 'A valid email is required'
    valid = false
  }
  return valid
}

// Function to update inventory for each ordered item
async function updateInventoryForOrder(items) {
  for (const item of items) {
    try {
      // Assume the inventory document ID is "spare-{item.id}"
      const inventoryRef = doc(db, 'inventory', `spare-${item.id}`)
      // Decrement stock by the quantity ordered
      await updateDoc(inventoryRef, { stock: increment(-item.quantity) })
    } catch (error) {
      console.error(`Error updating inventory for item ${item.id}:`, error)
    }
  }
}

async function placeOrder() {
  if (!validateForm()) return

  try {
    // Retrieve the current user's UID
    const currentUser = auth.currentUser
    const userId = currentUser ? currentUser.uid : null

    // Create an order object with shipping info, items, total, and a timestamp
    const orderData = {
      userId, // Include the user's UID so we can query orders later
      shippingInfo: shippingInfo.value,
      items: cart.items,
      total: total.value,
      createdAt: serverTimestamp(),
      status: 'Processing'
    }

    // Add the order to Firestore
    await addDoc(collection(db, 'orders'), orderData)

    // Update inventory for each ordered item
    await updateInventoryForOrder(cart.items)

    // Update UI on success
    orderPlaced.value = true
    // Clear the cart and reset shipping info
    cart.items = []
    shippingInfo.value = { name: '', address: '', email: '' }
  } catch (error) {
    console.error("Error placing order:", error)
    // Optionally, display an error notification to the user here
  }
}
</script>
