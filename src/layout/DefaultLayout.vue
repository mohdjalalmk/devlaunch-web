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
  background-color: #343738; /* dark background */
  color: #f0f0f0;           /* light text */
  min-height: 100vh;        /* cover whole viewport height */
}

main {
  padding: 20px;
}
</style>
