import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuthStore } from './store/authStore'
import Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const app = createApp(App)
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
})

app.use(router)
app.use(pinia)
app.use(vuetify)
app.use(Toastify, { autoClose: 3000 });

// load user before app starts
const auth = useAuthStore()
auth?.loadUserFromStorage()

app.mount('#app')
