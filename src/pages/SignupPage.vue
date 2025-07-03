<template>
  <v-app>
    <v-main
      class="d-flex align-center justify-center"
      style="
        background-color: #1e1e2f;
        min-height: 100vh;
        font-family: 'Poppins', sans-serif;
      "
    >
      <v-card
        class="pa-6 rounded-lg signup-card"
        max-width="500"
        elevation="12"
        color="white"
      >
        <v-card-title class="justify-center mb-2">
          <span
            class="text-h5 font-weight-semibold"
            :style="{ color: brandColor }"
          >
            Sign Up for DevLaunch
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

        <v-form @submit.prevent="handleSignup">
          <v-text-field
            v-model="name"
            label="Name"
            placeholder="Your Name"
            :color="brandColor"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            :color="brandColor"
            variant="outlined"
            density="comfortable"
            class="mb-4"
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
            class="mb-6"
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
              Sign Up
            </v-btn>

            <v-btn
              variant="text"
              size="small"
              :style="{ color: brandColor }"
              @click="router.push('/login')"
            >
              <p class="text-caption no-uppercase">
                Already have an account? Login
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
import { signupUser } from "../api/auth";

const name = ref("");
const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

const loading = computed(() => auth.loading);
const error = computed(() => auth.error);

const brandColor = "#2503a1"; 

const handleSignup = async () => {
  auth.setLoading(true);
  auth.setError(null);
  try {
    const response = await signupUser(name.value, email.value, password.value);
    auth.setUser(response);
    router.push("/home");
  } catch (err) {
    console.log("error:",err.response.data.message);
    
    auth.setError(err.response.data.message || "Signup failed");
  } finally {
    auth.setLoading(false);
  }
};
</script>

<style scoped>
.signup-card {
  width: 100%;
  font-family: "Inter", sans-serif;
}
</style>
