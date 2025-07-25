<template>
  <nav class="navbar">
    <div class="logo-container">
      <div class="logo" @click="router.push('/')">DevLaunch</div>
    </div>

    <div class="dropdown" @click="toggleDropdown">
      <div class="avatar">{{ userInitial }}</div>
      <div v-if="showDropdown" class="dropdown-menu">
        <p class="dropdown-header">Hello, {{ auth.user?.name || 'User' }}</p>
        <hr class="dropdown-divider" />

        <button class="dropdown-item" @click.stop="goToEnrolled">
          📚 My Courses
        </button>

        <button class="dropdown-item" @click.stop="goToPrivacyPolicy">
          🔐 Privacy Policy
        </button>

        <button class="dropdown-item" @click.stop="confirmDeleteAccount">
          ❌ Delete Account
        </button>

        <hr class="dropdown-divider" />
        <button class="dropdown-item logout" @click.stop="logout">
          <LogOut class="icon" /> Logout
        </button>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="confirm-overlay">
      <div class="confirm-box">
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <div class="confirm-actions">
          <button class="cancel-btn" @click="showConfirmDialog = false">Cancel</button>
          <button class="delete-btn" @click="deleteAccount">Delete</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { LogOut } from 'lucide-vue-next';
import { useAuthStore } from "../store/authStore";
import { logoutUser, deleteAccountAPI } from "../api/auth";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const auth = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);
const showConfirmDialog = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = async () => {
  try {
    await logoutUser();
    auth.logout();
    router.push("/");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

const goToEnrolled = () => {
  router.push("/enrolled");
};

const goToPrivacyPolicy = () => {
  router.push("/privacy-policy");
};

const confirmDeleteAccount = () => {
  showConfirmDialog.value = true;
};

const deleteAccount = async () => {
  try {
    await deleteAccountAPI(); // Call API to delete user account
    auth.logout();
    router.push("/");
  } catch (error) {
    console.error("Account deletion failed", error);
  } finally {
    showConfirmDialog.value = false;
  }
};

const userInitial = computed(() => {
  return auth.user?.name?.charAt(0).toUpperCase() || "?";
});
</script>

<style scoped>
.navbar {
  background: #1e2a38;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.logo-container {
  display: flex;
  align-items: center;
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
  min-width: 180px;
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

/* Confirmation Dialog Styles */
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 100;
}

.confirm-box {
  background: #1e2a38;
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  text-align: center;
}

.confirm-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.cancel-btn,
.delete-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.cancel-btn {
  background: #64748b;
  color: white;
}

.delete-btn {
  background: #ef4444;
  color: white;
}
</style>
