<template>
  <div class="login-page">
    <h1>Login to DevLaunch</h1>
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 100px auto;
  background-color: #67809e;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.6);
  text-align: center;
}
h1 {
  color: #dce8f7;
  margin-bottom: 20px;
}
</style>
