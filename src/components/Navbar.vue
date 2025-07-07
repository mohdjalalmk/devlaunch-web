<template>
  <nav class="navbar">
    <div class="logo-container">
      <div class="logo">DevLaunch</div>
    </div>

    <div class="dropdown" @click="toggleDropdown">
      <div class="avatar">{{ userInitial }}</div>
      <div v-if="showDropdown" class="dropdown-menu">
        <p class="dropdown-header">Hello, {{ auth.user?.name || 'User' }}</p>
        <hr class="dropdown-divider" />
        <button class="dropdown-item" @click.stop="goToEnrolled">
          📚 My Courses
        </button>
        <hr class="dropdown-divider" />
        <button class="dropdown-item logout" @click.stop="logout">
          <LogOut class="icon" /> Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { LogOut } from 'lucide-vue-next';
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
    await logoutUser();
    auth.logout();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

const goToEnrolled = () => {
  router.push("/enrolled");
};

const userInitial = computed(() => {
  return auth.user?.name?.charAt(0).toUpperCase() || "?";
});
</script>

<style scoped>
.navbar {
  background:#1e2a38;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;   /* this centers vertically */
  padding: 12px 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.logo-container {
  display: flex;
  align-items: center;   /* ensures vertical centering */
}

.logo {
  font-size: 18px;
  font-weight: 600;
  margin-left: 12px;
  cursor: pointer;
}


.dropdown {
  position: relative;
  cursor: pointer;
  margin-top: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  background-color: #037067;   
  color: white;
  border-radius: 50%;
  display: grid;
  place-content: center;
  font-weight: bold;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 46px;
  background: #2d3e50;
  color: #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  min-width: 160px;
  z-index: 10;
}

.dropdown-header {
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #aaa;
}

.dropdown-divider {
  margin: 0;
  border: none;
  height: 1px;
  background: #444;
}

.dropdown-item {
  width: 100%;
  background: none;
  border: none;
  color: #f0f0f0;
  padding: 10px 12px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #3b4c5c;
}

.logout {
  color: #f87171;
}

.logout:hover {
  color: #f43f5e;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>

