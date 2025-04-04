<template>
  <div class="part-details-container">
    <div class="part-details-card">
      <!-- Image Gallery -->
      <div class="image-gallery">
        <div class="main-image-container">
          <img :src="selectedImage" :alt="part.name" class="main-image" />
        </div>
        <div class="thumbnail-container" v-if="partImages.length > 1">
          <img
            v-for="(img, index) in partImages"
            :key="index"
            :src="img"
            :alt="`Thumbnail ${index + 1}`"
            class="thumbnail"
            :class="{ active: selectedImage === img }"
            @click="selectedImage = img"
          />
        </div>
      </div>
      <!-- Part Information -->
      <div class="part-info">
        <h2>{{ part.name }}</h2>
        <p class="price">$ {{ part.price }}</p>
        <p class="description">{{ part.description }}</p>
        <!-- Specifications Section -->
        <div class="specifications" v-if="part.specs && part.specs.length">
          <h3>Specifications</h3>
          <ul>
            <li v-for="(spec, index) in part.specs" :key="index">{{ spec }}</li>
          </ul>
        </div>
        <!-- Reusable Reviews Component -->
        <ReviewSection :reviews="part.reviews" />
        
        <router-link to="/spare-parts" class="back-button">← Back to Spare Parts</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import ReviewSection from '@/components/ReviewSection.vue'

const route = useRoute()
const partId = parseInt(route.params.id)

// Parts data with all 14 items
const parts = [
  {
    id: 1,
    name: 'Brake Pads',
    price: 25,
    image: new URL('@/assets/images/brakes.jpg', import.meta.url).href,
    description:
      'Brake pads are a crucial component of your car’s braking system. They provide the necessary friction to stop your vehicle when you apply the brakes. Quality brake pads ensure safety and reliable performance on the road.',
    specs: ["Material: Ceramic", "Warranty: 12 months", "Compatibility: Most sedans"],
    reviews: [
      { text: "Excellent quality, very durable!", author: "John D." },
      { text: "Good value for money.", author: "Alice S." }
    ],
    images: [
      new URL('@/assets/images/brakes.jpg', import.meta.url).href,
      new URL('@/assets/images/brakes.jpg', import.meta.url).href,
      new URL('@/assets/images/brakes.jpg', import.meta.url).href
    ]
  },
  {
    id: 2,
    name: 'Engine Oil',
    price: 30,
    image: new URL('@/assets/images/engine_oil.jpg', import.meta.url).href,
    description:
      'Engine oil lubricates engine components, reduces friction, cools engine parts, and prevents corrosion. Regular oil changes using quality oil extend engine life and maintain smooth performance.',
    specs: ["Viscosity: 5W-30", "Volume: 4L", "Brand: Premium Oil Co."],
    reviews: [{ text: "Keeps my engine running smooth.", author: "Mike P." }],
    images: [
      new URL('@/assets/images/engine_oil.jpg', import.meta.url).href,
      new URL('@/assets/images/engine_oil.jpg', import.meta.url).href
    ]
  },
  {
    id: 3,
    name: 'Air Filter',
    price: 15,
    image: new URL('@/assets/images/air_filter.jpg', import.meta.url).href,
    description:
      'An air filter keeps dust, dirt, and debris from entering the engine. Clean air improves combustion and fuel efficiency. Replacing a dirty filter ensures your engine performs at its best.',
    specs: ["Filter Material: High-efficiency", "Replacement Interval: 12 months"],
    reviews: [{ text: "Noticeably improved engine performance!", author: "Sara L." }],
    images: [new URL('@/assets/images/air_filter.jpg', import.meta.url).href]
  },
  {
    id: 4,
    name: 'Car Battery',
    price: 100,
    image: new URL('@/assets/images/car_battery.jpg', import.meta.url).href,
    description:
      'A car battery powers your vehicle’s electrical systems and starts the engine. A good battery offers strong cold cranking amps and long service life, ensuring reliable starts and uninterrupted operation of your vehicle’s systems.',
    specs: ["Voltage: 12V", "Capacity: 70Ah", "Warranty: 24 months"],
    reviews: [{ text: "Reliable performance, started my car even in winter.", author: "Tim K." }],
    images: [
      new URL('@/assets/images/car_battery.jpg', import.meta.url).href,
      new URL('@/assets/images/car_battery.jpg', import.meta.url).href
    ]
  },
  // Items 5-14 with placeholder data for consistency:
  {
    id: 5,
    name: 'Windshield Wipers',
    price: 20,
    image: new URL('@/assets/images/windshield_wipers.jpg', import.meta.url).href,
    description:
      'High-quality windshield wipers ensure clear visibility in rainy conditions.',
    specs: ["Durability: 12 months", "Compatibility: Most vehicles"],
    reviews: [{ text: "Works great in heavy rain.", author: "David M." }],
    images: [new URL('@/assets/images/windshield_wipers.jpg', import.meta.url).href]
  },
  {
    id: 6,
    name: 'Headlights',
    price: 80,
    image: new URL('@/assets/images/headlights.jpg', import.meta.url).href,
    description:
      'Bright and efficient headlights for optimal night driving.',
    specs: ["Type: LED", "Warranty: 18 months"],
    reviews: [{ text: "Very bright and long-lasting.", author: "Laura W." }],
    images: [new URL('@/assets/images/headlights.jpg', import.meta.url).href]
  },
  {
    id: 7,
    name: 'Tail Lights',
    price: 70,
    image: new URL('@/assets/images/tail_lights.jpg', import.meta.url).href,
    description:
      'Durable tail lights that enhance both safety and style.',
    specs: ["Type: LED", "Warranty: 12 months"],
    reviews: [{ text: "Looks great and functions well.", author: "Chris R." }],
    images: [new URL('@/assets/images/tail_lights.jpg', import.meta.url).href]
  },
  {
    id: 8,
    name: 'Spark Plugs',
    price: 15,
    image: new URL('@/assets/images/spark_plugs.jpg', import.meta.url).href,
    description:
      'High-performance spark plugs that improve engine ignition and efficiency.',
    specs: ["Material: Platinum", "Warranty: 12 months"],
    reviews: [{ text: "Engine performance improved noticeably.", author: "Karen B." }],
    images: [new URL('@/assets/images/spark_plugs.jpg', import.meta.url).href]
  },
  {
    id: 9,
    name: 'Fuel Filter',
    price: 25,
    image: new URL('@/assets/images/fuel_filter.jpg', import.meta.url).href,
    description:
      'Keeps impurities out of your engine for optimal performance.',
    specs: ["Replacement Interval: 12 months"],
    reviews: [{ text: "Engine feels much cleaner.", author: "Eric L." }],
    images: [new URL('@/assets/images/fuel_filter.jpg', import.meta.url).href]
  },
  {
    id: 10,
    name: 'Battery Cables',
    price: 35,
    image: new URL('@/assets/images/battery_cables.jpg', import.meta.url).href,
    description:
      'Heavy-duty battery cables for reliable power connections.',
    specs: ["Length: 1.5m", "Material: Copper"],
    reviews: [{ text: "Very sturdy and durable.", author: "Samantha T." }],
    images: [new URL('@/assets/images/battery_cables.jpg', import.meta.url).href]
  },
  {
    id: 11,
    name: 'Alternator',
    price: 150,
    image: new URL('@/assets/images/alternator.jpg', import.meta.url).href,
    description:
      'An efficient alternator ensures a stable power supply for your vehicle.',
    specs: ["Output: 120A", "Warranty: 24 months"],
    reviews: [{ text: "Steady performance with no issues.", author: "George P." }],
    images: [new URL('@/assets/images/alternator.jpg', import.meta.url).href]
  },
  {
    id: 12,
    name: 'Radiator',
    price: 200,
    image: new URL('@/assets/images/radiator.jpg', import.meta.url).href,
    description:
      'A high-performance radiator that efficiently cools your engine to prevent overheating.',
    specs: ["Material: Aluminum", "Warranty: 18 months"],
    reviews: [{ text: "My engine runs much cooler now.", author: "Linda S." }],
    images: [new URL('@/assets/images/radiator.jpg', import.meta.url).href]
  },
  {
    id: 13,
    name: 'Clutch Kit',
    price: 250,
    image: new URL('@/assets/images/clutch_kit.jpg', import.meta.url).href,
    description:
      'A complete clutch kit designed for smooth gear transitions.',
    specs: ["Includes: Clutch disc, pressure plate, release bearing"],
    reviews: [{ text: "Perfect replacement for my old clutch kit.", author: "Matthew W." }],
    images: [new URL('@/assets/images/clutch_kit.jpg', import.meta.url).href]
  },
  {
    id: 14,
    name: 'Air Conditioning Filter',
    price: 18,
    image: new URL('@/assets/images/ac_filter.jpg', import.meta.url).href,
    description:
      'A high-quality AC filter that maintains clean air in your vehicle.',
    specs: ["Replacement Interval: 12 months"],
    reviews: [{ text: "Noticed a difference in air quality immediately.", author: "Olivia H." }],
    images: [new URL('@/assets/images/ac_filter.jpg', import.meta.url).href]
  }
]

// Identify the current part based on the route parameter
const part = computed(() => parts.find((p) => p.id === partId))
// Set the default selected image
const selectedImage = ref(part.value && part.value.images.length ? part.value.images[0] : '')
const partImages = computed(() => (part.value ? part.value.images : []))
</script>
