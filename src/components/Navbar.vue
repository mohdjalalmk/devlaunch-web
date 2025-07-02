<template>
  <nav class="navbar">
    <h1>DevLaunch</h1>
    <div class="user-menu" @click="toggleDropdown">
      <div class="user-badge">{{ userInitial }}</div>
      <div v-if="showDropdown" class="dropdown">
        <button @click.stop="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../store/authStore";
import { logoutUser } from "../api/auth";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const auth = useAuthStore();
const router = useRouter();

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = async () => {
  try {
    await logoutUser(); // optional: call backend logout if exists
    auth.logout();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

const userInitial = computed(() => {
  if (auth.user && auth.user.email) {
    return auth.user.email.charAt(0).toUpperCase();
  }
  return "?";
});
</script>

<style scoped>
.navbar {
  background-color: #1c1f21;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: #f0f0f0;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #42b983;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 42px;
  background-color: #3a3a3a;
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown button {
  background: none;
  border: none;
  color: #f0f0f0;
  padding: 8px 16px;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.dropdown button:hover {
  background-color: #555;
}
</style>
