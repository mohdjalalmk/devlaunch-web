<template>
  <video controls :src="videoUrl" width="100%"></video>
</template>

<script setup>
defineProps(['videoUrl'])
</script>
