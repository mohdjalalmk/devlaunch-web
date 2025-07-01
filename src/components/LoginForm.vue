<template>
  <form @submit.prevent="handleLogin">
    <div>
      <input v-model="email" type="email" required />
    </div>
    <div>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { loginUser } from '../api/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const loading = computed(() => auth.loading)
const error = computed(() => auth.error)

const handleLogin = async () => {
  auth.setLoading(true)
  auth.setError(null)
  try {
    const response = await loginUser(email.value, password.value)
    auth.setUser(response)
    router.push('/home')
  } catch (err) {
    auth.setError(err.message || 'Login failed')
  } finally {
    auth.setLoading(false)
  }
}
</script>

<style scoped>
/* Make inputs always dark */
input {
  margin: 10px;
  padding: 8px;
  width: 80%;
  background: #2c2c2c;
  color: #f0f0f0;
  border: 1px solid #555;
  border-radius: 4px;
  outline: none;
}

/* Remove placeholder text color flash (make them same color as text) */
input::placeholder {
  color: #aaa; /* or remove entirely if no placeholder */
}

button {
  padding: 8px 16px;
  background-color: #4a95f0;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button:disabled {
  background-color: #888;
}
.error {
  color: red;
}
</style>
