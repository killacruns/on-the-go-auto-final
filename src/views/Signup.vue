<template>
  <div class="signup-page">
    <div class="signup-card">
      <img src="/src/assets/images/On-The_Go_logo1.png" alt="OnTheGo Auto Logo" class="logo-img" />
      <h2 class="signup-title">Sign Up</h2>
      <form @submit.prevent="register" class="signup-form">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          required
          class="input-field"
        />
        <input
          v-model="phone"
          type="tel"
          placeholder="Phone Number"
          class="input-field"
        />
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
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          class="input-field"
        />
        <button type="submit" class="btn-submit">Sign Up</button>
      </form>

      <p class="signup-switch">
        Already have an account?
        <router-link to="/login" class="link-green">Login</router-link>
      </p>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const name = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const router = useRouter()

async function register() {
  // Basic validation
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  try {
    const auth = getAuth()
    // Create the user
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

    // Optionally update the user's displayName in Firebase
    await updateProfile(userCredential.user, {
      displayName: name.value
    })


    // Redirect to home or profile after successful signup
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
