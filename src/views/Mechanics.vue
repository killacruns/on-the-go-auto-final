<template>
  <div class="mechanics-page">
    <h2 class="page-title">Available Mechanics</h2>
    <div class="mechanics-grid">
      <div class="mechanic-card" v-for="(mechanic, index) in mechanics" :key="mechanic.id">
        <img :src="mechanic.image" :alt="mechanic.name" class="mechanic-image" />
        
        <div class="mechanic-info">
          <h3 class="mechanic-name">{{ mechanic.name }}</h3>
          <p class="specialization">{{ mechanic.specialization }}</p>
          <p class="rating">⭐ {{ mechanic.rating }}</p>

          <!-- Service Dropdown -->
          <select v-model="selectedServices[index]" class="service-dropdown">
            <option disabled value="">Select a service</option>
            <option
              v-for="(service, sIndex) in mechanic.services"
              :key="sIndex"
              :value="service"
            >
              {{ service.name }} - ${{ service.price }}
            </option>
          </select>

          <!-- Button Row (View Details & Add to Cart) -->
          <div class="button-row">
            <router-link :to="`/mechanic-details/${mechanic.id}`" class="btn btn-clear">
              View Details
            </router-link>
            <button
              class="btn btn-primary"
              @click="addToCart(mechanic, index)"
              :disabled="!selectedServices[index]"
            >
              Add to Cart
            </button>
          </div>

          <!-- Booking Appointment -->
          <div class="booking-section">
            <button class="btn btn-secondary" @click="toggleBooking(index)">
              Book Appointment
            </button>
            <div v-if="bookingActive[index]" class="booking-form">
              <input
                type="date"
                v-model="bookingDates[index]"
                class="booking-date"
              />
              <button class="btn btn-confirm" @click="confirmBooking(mechanic, index)">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="notification" class="toast">{{ notification }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/store/cart'

const cart = useCartStore()

const mechanics = ref([
  {
    id: 1,
    name: 'Mike Johnson',
    specialization: 'Brake Systems Specialist',
    rating: 4.8,
    image: new URL('@/assets/images/Mike_Johnson.jpg', import.meta.url).href,
    services: [
      { name: 'Brake Pad Replacement', price: 40 },
      { name: 'ABS Diagnosis', price: 60 },
      { name: 'Brake Fluid Flush', price: 50 },
      { name: 'Rotor Resurfacing', price: 45 }
    ],
  },
  {
    id: 2,
    name: 'Cleopatra Smith',
    specialization: 'Engine & Diagnostics Expert',
    rating: 4.9,
    image: new URL('@/assets/images/Cleopatra_Smith.jpg', import.meta.url).href,
    services: [
      { name: 'Engine Diagnostics', price: 70 },
      { name: 'Performance Tuning', price: 100 },
      { name: 'Oil Change', price: 35 },
      { name: 'Spark Plug Replacement', price: 55 }
    ],
  },
  {
    id: 3,
    name: 'Carlos Rivera',
    specialization: 'Transmission & Gearbox Technician',
    rating: 4.7,
    image: new URL('@/assets/images/John_Stone.jpg', import.meta.url).href,
    services: [
      { name: 'Transmission Repair', price: 120 },
      { name: 'Gearbox Inspection', price: 90 },
      { name: 'Fluid Change', price: 80 },
      { name: 'Clutch Replacement', price: 150 }
    ],
  },
])

const selectedServices = ref(Array(mechanics.value.length).fill(''))
const notification = ref('')

// Booking state
const bookingActive = ref(Array(mechanics.value.length).fill(false))
const bookingDates = ref(Array(mechanics.value.length).fill(''))

function addToCart(mechanic, index) {
  const service = selectedServices.value[index]
  if (service) {
    cart.addItem({
      id: `mech-${mechanic.id}-${service.name.replace(/\s/g, '-').toLowerCase()}`,
      name: `${mechanic.name} - ${service.name}`,
      type: 'service',
      price: service.price,
      quantity: 1,
      image: mechanic.image
    })
    // Reset dropdown
    selectedServices.value[index] = ''
    notification.value = 'Service added to cart!'
    setTimeout(() => {
      notification.value = ''
    }, 2000)
  }
}

function toggleBooking(index) {
  bookingActive.value[index] = !bookingActive.value[index]
}

function confirmBooking(mechanic, index) {
  const date = bookingDates.value[index]
  if (!date) {
    notification.value = 'Please select a booking date.'
    setTimeout(() => {
      notification.value = ''
    }, 2000)
    return
  }
  notification.value = `Appointment booked with ${mechanic.name} on ${date}!`
  // Reset booking
  bookingActive.value[index] = false
  bookingDates.value[index] = ''
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}
</script>
