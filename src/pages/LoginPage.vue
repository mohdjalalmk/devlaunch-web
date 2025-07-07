<template>
  <v-app>
    <v-main
      class="d-flex flex-column align-center"
      style="
        background-color: #1e1e2f;
        min-height: 100vh;
        font-family: 'Poppins', sans-serif;
        padding-top: 60px; /* space for logo on top */
      "
    >
      <img
        src="../assets/devlaunch-2.png"
        alt="DevLaunch Logo"
        class="logo mb-4"
      />

      <v-card
        class="pa-6 rounded-lg login-card"
        max-width="500"
        elevation="12"
        color="white"
      >
        <v-card-title class="justify-center mb-2">
          <span
            class="text-h5 font-weight-semibold"
            :style="{ color: brandColor }"
          >
            Login to DevLaunch
          </span>
        </v-card-title>

        <v-card-subtitle class="text-center mb-6" style="color: #666">
        </v-card-subtitle>

        <v-alert
          v-if="error"
          type="error"
          density="compact"
          outlined
          class="mb-4"
        >
          {{ error }}
        </v-alert>

        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            :color="brandColor"
            variant="outlined"
            density="comfortable"
            class="mb-4 small-input"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            :color="brandColor"
            variant="outlined"
            density="comfortable"
            class="mb-4 small-input"
            required
          ></v-text-field>

          <div class="d-flex flex-column align-center">
            <v-btn
              :loading="loading"
              :disabled="loading"
              :color="brandColor"
              type="submit"
              class="mb-4 no-uppercase"
              style="width: 60%; text-transform: none"
            >
              Login
            </v-btn>

            <v-btn
              variant="text"
              size="small"
              :style="{ color: brandColor }"
              @click="router.push('/signup')"
            >
              <p class="text-caption no-uppercase">
                Don't have an account? Sign Up
              </p>
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { loginUser } from "../api/auth";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const loading = computed(() => auth.loading);
const error = computed(() => auth.error);

const brandColor = "#2503a1";
const handleLogin = async () => {
  auth.setLoading(true);
  auth.setError(null);
  try {
    const response = await loginUser(email.value, password.value);
    auth.setUser(response);
    router.push("/home");
  } catch (err) {
    auth.setError(err.response.data.message || "Login failed");
  } finally {
    auth.setLoading(false);
  }
};
</script>

<style scoped>
.login-card {
  width: 100%;
  font-family: "Inter", sans-serif;
}
.small-input .v-field__input {
  font-size: 13px; 
}
.small-input input::placeholder {
  font-size: 12px; 
}
.logo {
  width: 240px;
  object-fit: contain;
}
</style>
