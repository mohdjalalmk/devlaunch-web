<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2 class="login-title">Login to DevLaunch</h2>
      <p class="login-subtitle">Please enter your credentials</p>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
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
/* Center form vertically & horizontally */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1e2f;
  padding: 16px;
}

/* Form styling */
.login-form {
  background: #2c2c3e;
  padding: 32px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 16px; /* space between elements */
}

/* Titles */
.login-title {
  color: #f0f0f0;
  text-align: center;
  margin: 0;
  font-size: 24px;
}

.login-subtitle {
  color: #bbb;
  text-align: center;
  font-size: 14px;
  margin-bottom: 8px;
}

/* Form fields */
.form-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #ddd;
  font-size: 14px;
  margin-bottom: 4px;
}

input {
  padding: 10px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #3a3a4f;
  color: #f0f0f0;
  font-size: 14px;
  outline: none;
}

input::placeholder {
  color: #888;
}

/* Button */
button {
  padding: 10px;
  background-color: #4a95f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #337cd6;
}

button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

/* Error message */
.error-message {
  color: #ff6b6b;
  font-size: 13px;
  text-align: center;
  margin-bottom: 4px;
}
</style>
