<template>
  <v-app>
    <v-main
      class="d-flex flex-column align-center justify-center"
      style="
        background-color: #1e1e2f;
        min-height: 100vh;
        font-family: 'Poppins', sans-serif;
      "
    >
     <!-- <img
        src="../assets/devlaunch-2.png"
        alt="DevLaunch Logo"
        class="logo mb-4"
      /> -->
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
            <CourseCarousel />

      <v-dialog v-model="showOtpModal" max-width="400">
        <v-card>
          <v-card-title class="text-center"> Verify OTP </v-card-title>
            <v-card-text class="d-flex justify-center gap-2">
              <v-text-field
                v-for="(digit, index) in otpDigits"
                :key="index"
                v-model="otpDigits[index]"
                type="text"
                maxlength="1"
                class="otp-box"
                hide-details
                solo
                :color="brandColor"
                @input="focusNext(index, $event)"
                @keydown.backspace="focusPrev(index, $event)"
              ></v-text-field>
            </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              :loading="loading"
              :color="brandColor"
              @click="handleVerifyOtp"
            >
              Verify
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { signupUser, verifyOtp } from "../api/auth";
import validator from "validator";
import { toast } from "vue3-toastify";
import CourseCarousel from "../components/CourseCarousel.vue";

const name = ref("");
const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

const loading = computed(() => auth.loading);
const error = computed(() => auth.error);

const brandColor = "#2503a1";

const showOtpModal = ref(false);
const otpDigits = ref(["", "", "", "", "", ""]);

// Move focus to next input when typing
const focusNext = (index, event) => {
  if (event.inputType === "deleteContentBackward") return; 
  if (otpDigits.value[index] && index < otpDigits.value.length - 1) {
    const next = document.querySelectorAll(".otp-box input")[index + 1];
    next && next.focus();
  }
};

// Move focus to previous input on backspace
const focusPrev = (index, event) => {
  if (!otpDigits.value[index] && index > 0) {
    const prev = document.querySelectorAll(".otp-box input")[index - 1];
    prev && prev.focus();
  }
};

const handleSignup = async () => {
  auth.setLoading(true);
  auth.setError(null);

  // Local validation first
  if (!name.value || !email.value || !password.value) {
    auth.setError("Name, email, and password are required.");
    auth.setLoading(false);
    return;
  }

  if (name.value.length < 2 || name.value.length > 50) {
    auth.setError("Name must be between 2 and 50 characters.");
    auth.setLoading(false);
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(name.value)) {
    auth.setError("Name can only contain letters and spaces.");
    auth.setLoading(false);
    return;
  }

  if (!validator.isEmail(email.value)) {
    auth.setError("Invalid email address.");
    auth.setLoading(false);
    return;
  }

  if (!validator.isStrongPassword(password.value)) {
    auth.setError(
      "Password must include uppercase, lowercase, number, and special character."
    );
    auth.setLoading(false);
    return;
  }

  try {
    await signupUser(name.value, email.value, password.value);
    showOtpModal.value = true;
  } catch (err) {
    auth.setError(err?.response?.data?.message || "Signup failed");
    toast.error(err?.response?.data?.message || "Signup failed");
  } finally {
    auth.setLoading(false);
  }
};

const handleVerifyOtp = async () => {

  auth.setLoading(true);
  auth.setError(null);
  try {
    const code = otpDigits.value.join("");
    if (code.length !== 6) {
      toast("Please enter the complete 6-digit OTP!", { type: "error" });
      return;
    }
    const response = await verifyOtp(email.value, code);
    auth.setUser(response.data);
    showOtpModal.value = false;
    router.push("/home");
  } catch (err) {
    const message = err?.response?.data?.message || "Invalid OTP";
    auth.setError(message);
    toast.error(message);
  } finally {
    auth.setLoading(false);
  }
};
</script>

<style scoped>
.signup-card {
  width: 100%;
  font-family: "Inter", sans-serif;
  margin-bottom: 50px;
}
.otp-box {
  width: 40px;
  text-align: center;
}

</style>
