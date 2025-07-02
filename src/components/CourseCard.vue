<template>
  <div class="course-card">
    <img :src="course.thumbnail" alt="Course thumbnail" class="thumbnail" />
    <h4>{{ course.title }}</h4>
    <p class="author">Course by {{ course.creator.name }}</p>
    <span v-if="enrolled" class="badge">Enrolled</span>
  </div>
</template>


<script setup>
defineProps(['course', 'enrolled'])
</script>

<style scoped>
.course-card {
  background: #2c2c2c;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

h4 {
  font-size: 16px;
  margin: 4px 0;
  text-align: center;
}

.author {
  font-size: 13px;
  color: #aaa;
  margin-bottom: 6px;
  text-align: center;
}

.badge {
  background: #3fc488;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

</style>
