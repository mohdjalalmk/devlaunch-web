<template>
  <div class="course-card">
    <h4>{{ course.title }}</h4>
    <p>{{ course.description }}</p>
    <span v-if="enrolled" class="badge">Enrolled</span>
  </div>
</template>

<script setup>
defineProps(['course', 'enrolled'])
</script>

<style scoped>
.course-card {
  background: #2c2c2c;
  padding: 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 200px;
}
.badge {
  background: #3fc488;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
