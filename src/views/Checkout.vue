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

function placeOrder() {
  if (!validateForm()) return
  // Simulate order processing...
  orderPlaced.value = true
  // Clear the cart and reset form
  cart.items = []
  shippingInfo.value = { name: '', address: '', email: '' }
}
</script>
