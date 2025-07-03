import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
})

app.use(router)
app.use(pinia)
app.use(vuetify)

// load user before app starts
import { useAuthStore } from './store/authStore'
const auth = useAuthStore()
auth.loadUserFromStorage()

app.mount('#app')
