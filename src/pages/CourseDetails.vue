<template>
  <DefaultLayout>
    <div class="course-detail">
      <!-- Left: Video Player + video info -->
      <div class="video-section">
        <VideoPlayer
          v-if="signedVideoUrl"
          :videoUrl="signedVideoUrl"
        />
        <img v-else :src="course?.thumbnail" class="thumbnail" />

        <div v-if="selectedVideo" class="video-info">
          <h3 class="video-title">{{ selectedVideo.title }}</h3>
          <p class="video-description">{{ selectedVideo.description || 'No description available.' }}</p>
        </div>
      </div>

      <!-- Right: Video list -->
      <div class="video-list">
        <h3>Course Videos</h3>
        <div
          v-for="video in course?.videos"
          :key="video.key"
          class="video-item"
          @click="playVideo(video)"
        >
          <span>{{ video.title }}</span>
          <span v-if="!enrolled" class="locked">🔒</span>
        </div>

        <!-- Enroll button if not enrolled -->
        <button v-if="!enrolled" class="enroll-btn" @click="enroll">Enroll to watch</button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '../layout/DefaultLayout.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import { getCourseById, enrollInCourse, getMyEnrolledCourses,getSignedVideoUrl } from '../api/course'
import { useAuthStore } from '../store/authStore'

const route = useRoute()
const auth = useAuthStore()

const course = ref(null)
const enrolled = ref(false)
const selectedVideo = ref(null) // currently playing video
const signedVideoUrl = ref(null) // signed URL for selected video

onMounted(async () => {
  const data = await getCourseById(route.params.id)
  course.value = data.course

  try {
    const myCourses = await getMyEnrolledCourses()
    const enrolledIds = myCourses?.enrolledCourses.map((c) => c.courseId._id)
    enrolled.value = enrolledIds.includes(route.params.id)
  } catch (error) {
    console.error(error)
  }

  // Optionally set default selected video
   if (course.value?.videos?.length > 0) {
    selectedVideo.value = course.value.videos[0]
    if (enrolled.value) {
      await playVideo(selectedVideo.value)
    }
  }
  
})

const playVideo = async (video) => {
  if (!enrolled.value) return
  try {
    const data = await getSignedVideoUrl(course.value._id, video.key)
    console.log("video:",data);
    
    signedVideoUrl.value = data.url
    selectedVideo.value = video
  } catch (error) {
    console.error(error)
  }
}


const enroll = async () => {
  try {
    await enrollInCourse(route.params.id)
    enrolled.value = true
  } catch (error) {
    console.error(error)
  }
}


</script>

<style scoped>
.course-detail {
  display: flex;
  gap: 24px;
}

.video-section {
  flex: 3;
  max-width: 1200px;
  min-width: 5 00px;
}

.video-section video {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.video-info {
  margin-top: 12px;
}

.video-title {
  font-size: 18px;
  color: #f0f0f0;
  margin: 0;
}

.video-description {
  font-size: 14px;
  color: #ccc;
  margin-top: 4px;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.video-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.video-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c2c2c;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.locked {
  color: #888;
}

.enroll-btn {
  margin-top: 16px;
  padding: 8px;
  background: #3fc488;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>

