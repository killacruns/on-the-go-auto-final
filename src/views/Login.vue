<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Logo -->
      <img src="/src/assets/images/On-The_Go_logo1.png" alt="OnTheGo Auto Logo" class="logo-img" />

      <h2 class="login-title">Login</h2>
      <form @submit.prevent="login" class="login-form">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="input-field"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="input-field"
        />
        <button type="submit" class="btn-submit">Login</button>
      </form>

      <p class="login-switch">
        Don't have an account?
        <router-link to="/signup" class="link-green">Sign up</router-link>
      </p>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function login() {
  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
