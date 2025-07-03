<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>
<style scoped>
div {
  background-color:#303641;
  color: #f0f0f0;           
  min-height: 100vh;        
}

main {
  padding: 20px;
}
</style>
