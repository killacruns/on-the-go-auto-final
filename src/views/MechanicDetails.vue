<template>
  <div class="mechanic-details-container">
    <div class="mechanic-details-card" v-if="mechanic">
      <!-- Left Column: Single Mechanic Image (thumbnails removed) -->
      <div class="mechanic-image-container">
        <img :src="mechanic.image" :alt="mechanic.name" class="mechanic-image" />
      </div>
      
      <!-- Right Column: Mechanic Details -->
      <div class="mechanic-info">
        <h2>{{ mechanic.name }}</h2>
        <p class="specialization">{{ mechanic.specialization }}</p>
        <p class="rating">⭐ {{ mechanic.rating }}</p>
        <p class="bio">{{ mechanic.bio }}</p>
        
        <!-- Qualifications Section -->
        <div class="qualifications" v-if="mechanic.qualifications && mechanic.qualifications.length">
          <h3>Qualifications</h3>
          <ul>
            <li v-for="(qual, qIndex) in mechanic.qualifications" :key="qIndex">{{ qual }}</li>
          </ul>
        </div>
        
        <!-- Reusable Reviews Component -->
        <ReviewSection :reviews="mechanic.reviews" />
        
        <router-link to="/mechanics" class="back-button">← Back to Mechanics</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import ReviewSection from '@/components/ReviewSection.vue'

const route = useRoute()
const mechanicId = parseInt(route.params.id)

// Sample mechanics data
const mechanics = [
  {
    id: 1,
    name: 'Mike Johnson',
    specialization: 'Brake Systems Specialist',
    rating: 4.8,
    image: new URL('@/assets/images/Mike_Johnson.jpg', import.meta.url).href,
    bio: "With over a decade of experience, Mike specializes in brake systems for various vehicles. He is meticulous and ensures every repair meets top safety standards.",
    qualifications: [
      "Certified Brake Specialist",
      "10+ Years of Experience",
      "Expert in Hydraulic Brakes"
    ],
    reviews: [
      { text: "Mike fixed my brakes quickly and professionally!", author: "John D." },
      { text: "Reliable and efficient service.", author: "Alice S." }
    ]
  },
  {
    id: 2,
    name: 'Cleopatra Smith',
    specialization: 'Engine & Diagnostics Expert',
    rating: 4.9,
    image: new URL('@/assets/images/Cleopatra_Smith.jpg', import.meta.url).href,
    bio: "Cleopatra is an expert in modern engine diagnostics and performance tuning, ensuring your engine runs smoothly and efficiently.",
    qualifications: [
      "Engine Diagnostics Specialist",
      "15+ Years of Experience",
      "Certified in Performance Tuning"
    ],
    reviews: [
      { text: "Her diagnostics saved me time and money!", author: "Mike P." },
      { text: "The best engine expert I have ever met.", author: "Sara L." }
    ]
  },
  {
    id: 3,
    name: 'Carlos Rivera',
    specialization: 'Transmission & Gearbox Technician',
    rating: 4.7,
    image: new URL('@/assets/images/John_Stone.jpg', import.meta.url).href,
    bio: "Carlos specializes in transmissions and gearboxes, ensuring smooth shifts and efficient power transfer. He is highly skilled in both repair and maintenance.",
    qualifications: [
      "Transmission Repair Expert",
      "8+ Years of Experience",
      "Specialized Gearbox Training"
    ],
    reviews: [
      { text: "Carlos restored my gearbox to perfect condition.", author: "Tim K." },
      { text: "Highly recommend for any transmission issues.", author: "Nina R." }
    ]
  }
]

const mechanic = computed(() => mechanics.find(m => m.id === mechanicId))
</script>
