<template>
  <div class="cart-page">
    <h2 class="page-title">Your Cart</h2>

    <!-- If the cart is empty, show a simple message -->
    <p v-if="spareParts.length === 0 && mechanics.length === 0" class="empty-cart">
      Your cart is currently empty.
    </p>

    <!-- Otherwise, show the tables and summary -->
    <div v-else>
      <!-- Spare Parts Table -->
      <div v-if="spareParts.length" class="cart-section">
        <h3>Spare Parts</h3>
        <table class="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in spareParts" :key="item.id">
              <td>{{ item.name }}</td>
              <td>${{ item.price }}</td>
              <td>
                <button @click="removeItem(item)" class="btn btn-secondary">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mechanic Services Table -->
      <div v-if="mechanics.length" class="cart-section">
        <h3>Mechanic Services</h3>
        <table class="cart-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in mechanics" :key="item.id">
              <td>
                <!-- You can add more details here if desired (rating, specialization, etc.) -->
                {{ item.name }}
              </td>
              <td>${{ item.price }}</td>
              <td>
                <button @click="removeItem(item)" class="btn btn-secondary">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <h3>Total: ${{ total }}</h3>
        <router-link to="/checkout" class="btn btn-primary">
          Proceed to Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cart'

// Access your cart store
const cart = useCartStore()

// Separate cart items by type
const spareParts = computed(() =>
  cart.items.filter(item => item.type === 'spare')
)

const mechanics = computed(() =>
  cart.items.filter(item => item.type === 'service')
)

// Use the store's total getter
const total = computed(() => cart.total)

// Remove an item by calling the store's removeItem function
const removeItem = (item) => {
  cart.removeItem(item.id, item.type)
}
</script>
