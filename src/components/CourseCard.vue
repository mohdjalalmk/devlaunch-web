<template>
  <div class="course-card">
    <img :src="course.thumbnail" alt="Course thumbnail" class="thumbnail" />
    <h4>{{ course.title }}</h4>
    <p class="author">Course by {{ course.creator.name }}</p>
    <div class="bottom-row">
      <span v-if="enrolled" class="badge">Enrolled</span>
      <span v-else class="price">₹{{ course.price }}</span>
    </div>
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

.bottom-row {
  display: flex;
  justify-content: flex-end; 
  margin-top: auto;           
}

.badge {
  background: #3fc488;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.price {
  color: #3fc488;
  font-weight: 500;
  font-size: 14px;
}

</style>
