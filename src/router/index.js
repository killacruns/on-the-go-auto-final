import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Page Components
import Home from '../views/Home.vue'
import SpareParts from '../views/SpareParts.vue'
import Mechanics from '../views/Mechanics.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import PartDetails from '../views/PartDetails.vue'
import MechanicDetails from '../views/MechanicDetails.vue' 
import Checkout from '../views/Checkout.vue'
import Wishlist from '/src/views/wishlist.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/spare-parts', name: 'SpareParts', component: SpareParts },
  { path: '/mechanics', name: 'Mechanics', component: Mechanics, meta: { requiresAuth: true } },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/parts/:id', name: 'PartDetails', component: PartDetails },
  { path: '/mechanic-details/:id', name: 'MechanicDetails', component: MechanicDetails },
  { path: '/user-profile', name: 'UserProfile', component: UserProfile },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist },
  { path: '/checkout', name: 'Checkout', component: Checkout }
]

// Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route Guard for Protected Routes
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

export default router
