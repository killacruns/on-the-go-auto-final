import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import './firebaseConfig'
import { requestFCMToken } from './firebaseMessaging'
import '@fortawesome/fontawesome-free/css/all.min.css';


createApp(App).use(router).mount('#app')

requestFCMToken