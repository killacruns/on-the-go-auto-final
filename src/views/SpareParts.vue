<template>
  <div class="spare-parts-page">
    <!-- Page Header: Title, Search & Sorting -->
    <div class="parts-header">
      <h2>Browse Spare Parts</h2>
      <div class="header-controls">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for parts..."
          class="search-input"
        />
        <select v-model="sortOption" class="sort-select">
          <option value="default">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>
    </div>

    <!-- Parts Container (Grid Layout) -->
    <div class="parts-container">
      <div
        v-for="(part, index) in sortedFilteredParts"
        :key="part.id"
        class="part-card"
      >
        <img :src="part.image" :alt="part.name" class="part-img" />

        <div class="part-info">
          <h5>{{ part.name }}</h5>
          <p class="description">{{ part.description }}</p>
          <p class="price">$ {{ part.price }}</p>
        </div>

        <div class="part-actions">
          <!-- Add to Cart Button -->
          <button class="btn-add-cart" @click="addToCart(part)">
            Add to Cart
          </button>
          <!-- View Details Button -->
          <router-link :to="`/parts/${part.id}`" class="btn-view">
            View Details
          </router-link>
          <!-- Wishlist Button -->
          <button class="wishlist-btn" @click="toggleWishlist(part)">
            <i :class="isInWishlist(part) ? 'fas fa-heart' : 'far fa-heart'"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="notification" class="toast">
      {{ notification }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/cart'
import { useWishlist } from '@/composables/useWishlist'  // Import the wishlist composable

// Import images
import brakes from '@/assets/images/brakes.jpg'
import engineOil from '@/assets/images/engine_oil.jpg'
import airFilter from '@/assets/images/air_filter.jpg'
import carBattery from '@/assets/images/car_battery.jpg'
import windshieldWipers from '@/assets/images/windsheild_wipers.jpg'
import headlights from '@/assets/images/headlights.jpg'
import tailLights from '@/assets/images/tail_lights.jpg'
import sparkPlugs from '@/assets/images/spark_plugs.jpg'
import fuelFilter from '@/assets/images/fuel_filter.jpg'
import batteryCables from '@/assets/images/battery_cables.jpg'
import alternator from '@/assets/images/alternator.jpg'
import radiator from '@/assets/images/radiator.jpg'
import clutchKit from '@/assets/images/clutch_kit.jpg'
import acFilter from '@/assets/images/ac_filter.jpg'

const cart = useCartStore()
const { wishlist, toggleWishlistItem, isInWishlist: checkWishlist } = useWishlist() // Use global wishlist functions

const searchQuery = ref('')
const sortOption = ref('default')

// Sample spare parts data with 14 items
const parts = ref([
  {
    id: 1,
    name: 'Brake Pads',
    price: 25,
    description: 'Durable brake pads for safe stopping.',
    image: brakes,
  },
  {
    id: 2,
    name: 'Engine Oil',
    price: 30,
    description: 'High-performance engine oil for smooth running.',
    image: engineOil,
  },
  {
    id: 3,
    name: 'Air Filter',
    price: 15,
    description: 'Efficient air filtration for engine longevity.',
    image: airFilter,
  },
  {
    id: 4,
    name: 'Car Battery',
    price: 100,
    description: 'Long-lasting battery with high cold start power.',
    image: carBattery,
  },
  {
    id: 5,
    name: 'Windshield Wipers',
    price: 20,
    description: 'High-quality wipers for clear visibility in rain.',
    image: windshieldWipers,
  },
  {
    id: 6,
    name: 'Headlights',
    price: 80,
    description: 'Bright and efficient headlights for night driving.',
    image: headlights,
  },
  {
    id: 7,
    name: 'Tail Lights',
    price: 70,
    description: 'Durable tail lights ensuring safety and style.',
    image: tailLights,
  },
  {
    id: 8,
    name: 'Spark Plugs',
    price: 15,
    description: 'High-performance spark plugs for improved ignition.',
    image: sparkPlugs,
  },
  {
    id: 9,
    name: 'Fuel Filter',
    price: 25,
    description: 'Keeps impurities out of your engine for optimal performance.',
    image: fuelFilter,
  },
  {
    id: 10,
    name: 'Battery Cables',
    price: 35,
    description: 'Heavy-duty battery cables for reliable power connections.',
    image: batteryCables,
  },
  {
    id: 11,
    name: 'Alternator',
    price: 150,
    description: 'Efficient alternator for a stable power supply.',
    image: alternator,
  },
  {
    id: 12,
    name: 'Radiator',
    price: 200,
    description: 'High-performance radiator to keep your engine cool.',
    image: radiator,
  },
  {
    id: 13,
    name: 'Clutch Kit',
    price: 250,
    description: 'Complete clutch kit for smooth gear transitions.',
    image: clutchKit,
  },
  {
    id: 14,
    name: 'Air Conditioning Filter',
    price: 18,
    description: 'Maintain clean air in your car with a quality AC filter.',
    image: acFilter,
  }
])

// Filter parts based on search query
const filteredParts = computed(() => {
  if (!searchQuery.value) return parts.value
  return parts.value.filter((part) =>
    part.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Sort filtered parts based on selected sort option
const sortedFilteredParts = computed(() => {
  let sorted = [...filteredParts.value]
  if (sortOption.value === 'priceAsc') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'priceDesc') {
    sorted.sort((a, b) => b.price - a.price)
  } else if (sortOption.value === 'nameAsc') {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortOption.value === 'nameDesc') {
    sorted.sort((a, b) => b.name.localeCompare(a.name))
  }
  return sorted
})

const notification = ref('')

// Add to Cart function for spare parts
function addToCart(part) {
  cart.addItem({
    id: `spare-${part.id}`,
    name: part.name,
    price: part.price,
    type: 'spare',
    image: part.image,
    quantity: 1,
  })
  notification.value = 'Item added to cart!'
  setTimeout(() => {
    notification.value = ''
  }, 2000)
}

// Wishlist functions using global composable
function toggleWishlist(part) {
  // Ensure the part object includes a type property, e.g., 'spare'
  toggleWishlistItem({ ...part, type: 'spare' })
}

function isInWishlist(part) {
  return checkWishlist({ ...part, type: 'spare' })
}
</script>
