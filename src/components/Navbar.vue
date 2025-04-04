<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo">
        <img src="/src/assets/images/On-The_Go_logo1.png" alt="OnTheGo Auto Logo" class="logo-img" />
      </router-link>
      <ul class="nav-links">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/spare-parts" class="nav-link">Spare Parts</router-link></li>
        <li><router-link to="/mechanics" class="nav-link">Mechanics</router-link></li>
        <li><router-link to="/user-profile" class="nav-link">My Account</router-link></li>
        <li><router-link to="/wishlist" class="nav-link">Wishlist</router-link></li>
        <li><router-link to="/cart" class="nav-link">Cart</router-link></li>
        <li v-if="user">
          <button @click="logout" class="nav-link logout-btn">Logout</button>
        </li>
        <li v-else>
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()
const user = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})

const logout = async () => {
  await signOut(auth)
  router.push('/login')
}
</script>