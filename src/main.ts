import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

// load user before app starts
import { useAuthStore } from './store/authStore'
const auth = useAuthStore()
auth.loadUserFromStorage()

app.mount('#app')
