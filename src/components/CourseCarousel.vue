<template>
  <div class="carousel-container">
    <div class="carousel-track">
      <div
        v-for="(course, index) in duplicatedCourses"
        :key="index"
        class="course-card"
      >
        <v-card
          class="mx-2"
          elevation="6"
          width="200"
          color="white"
        >
          <v-img :src="course.image" height="120"></v-img>
          <v-card-title class="text-truncate">{{ course.title }}</v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import vueImg from '../../assets/vue.png';
import reactImg from '../../assets/reactnative.png';
import swiftImg from '../../assets/swiftui.png';
import kotlinImg from '../../assets/kotlin.png';
import angular from '../../assets/angular.png';
import next from '../../assets/next.png';
import node from '../../assets/nodejs.png';



const courses = [
  { title: "Vue Mastery", image: vueImg },
  { title: "React Native", image:reactImg},
  { title: "Advanced Node", image: node},
  { title: "Next JS", image: next },
  { title: "Angular", image: angular },
  { title: "Android", image: kotlinImg },
{ title: "SwiftUI", image: swiftImg },
];

// Duplicate the list so scrolling loops seamlessly
const duplicatedCourses = [...courses, ...courses];
</script>

<style scoped>
.carousel-container {
  overflow: hidden;
  width: 100%;
  background-color: #1e1e2f;
  padding: 16px 0;
}

.carousel-track {
  display: flex;
  animation: scroll-left 20s linear infinite;
}

.course-card {
  flex: none;
}

.course-card .v-card {
  background: linear-gradient(135deg, #2503a1, #037067); 
  color: white;
  border-radius: 12px;
  overflow: hidden;
}

.course-card .v-card-title {
  font-size: 14px;
  color: white;
}

.course-card .v-img {
  opacity: 0.9; 
}


@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
