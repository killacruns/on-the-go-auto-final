<template>
  <div class="home-page">
    
    <section class="hero-section">
      <img src="/src/assets/images/On_The_Go_logo2.png" alt="Logo Background" class="hero-background" />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Welcome to OnTheGo Auto</h1>
        <p>
          OnTheGo Auto is your one-stop solution for ordering genuine spare parts and booking trusted mechanics online.
          Powered by innovative technology, we bring quality and reliability right to your fingertips.
        </p>
        <div class="hero-buttons">
          <router-link to="/spare-parts" class="btn-modern-primary">Browse Spare Parts</router-link>
          <router-link to="/mechanics" class="btn-modern-outline">Find a Mechanic</router-link>
        </div>
      </div>
    </section>

    
    <section class="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div class="features-container">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <i :class="feature.icon" class="feature-icon"></i>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.text }}</p>
        </div>
      </div>
      
      <div class="about-project">
        <h3>About OnTheGo Auto</h3>
        <p>
          At OnTheGo Auto, we pride ourselves on connecting vehicle owners with the best spare parts and skilled mechanics.
          Our platform is built on a foundation of trust and quality, ensuring that every component is verified and every mechanic is certified.
        </p>
        <p>
          With a user-friendly interface, advanced filtering options, and secure payment and authentication via Firebase, we make maintaining and repairing your vehicle simple and hassle-free.
        </p>
      </div>
    </section>

    
    <section class="spare-parts">
      <h2>Featured Spare Parts</h2>
      <p class="featured-info">
        Discover our handpicked selection of genuine spare parts that have been thoroughly tested for quality and performance.
        Every part is chosen with your safety and vehicle efficiency in mind.
      </p>
      <div class="parts-grid">
        <div v-for="(item, index) in featuredParts" :key="index" class="part-card">
          <img :src="item.image" :alt="item.name" />
          <div class="part-info">
            <h5>{{ item.name }}</h5>
            <p>$ {{ item.price }}</p>
            <router-link to="/spare-parts">View More</router-link>
          </div>
        </div>
      </div>
    </section>

    
    <FAQToggle />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FAQToggle from '@/components/FAQToggle.vue'

const features = ref([
  { icon: 'fas fa-cogs', title: 'Genuine Parts', text: 'All parts are verified and high quality for lasting performance.' },
  { icon: 'fas fa-tools', title: 'Expert Mechanics', text: 'Our certified mechanics are dedicated to keeping you on the road.' },
  { icon: 'fas fa-shipping-fast', title: 'Fast Delivery', text: 'Quick and reliable delivery so you never have to wait.' }
])

const featuredParts = ref([
  { name: 'Brake Pads', price: 25, image: '/src/assets/images/brakes.jpg' },
  { name: 'Engine Oil', price: 30, image: '/src/assets/images/engine_oil.jpg' },
  { name: 'Air Filter', price: 15, image: '/src/assets/images/air_filter.jpg' },
  { name: 'Car Battery', price: 100, image: '/src/assets/images/car_battery.jpg' }
])
</script>
