<template>
  <DefaultLayout>
    <h2>{{ course?.title }}</h2>
    <p>{{ course?.description }}</p>
    <VideoPlayer v-if="enrolled" :videoUrl="course.videoUrl" />
    <button v-else @click="enroll">Enroll</button>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '../layout/DefaultLayout.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import { getCourseById, enrollInCourse } from '../api/course'
import { useAuthStore } from '../store/authStore'

const route = useRoute()
const auth = useAuthStore()

const course = ref(null)
const enrolled = ref(false)

onMounted(async () => {
  const data = await getCourseById(route.params.id)
  course.value = data
  enrolled.value = auth.user && data.enrolled // or check if user enrolled
})

const enroll = async () => {
  await enrollInCourse(route.params.id)
  enrolled.value = true
}
</script>
