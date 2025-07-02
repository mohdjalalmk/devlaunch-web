<template>
  <DefaultLayout>
    <div class="course-detail">
      <!-- Left: Video Player + video info -->
      <div class="video-section">
        <VideoPlayer v-if="signedVideoUrl" :videoUrl="signedVideoUrl" />
        <img v-else :src="course?.thumbnail" class="thumbnail" />

        <div v-if="selectedVideo" class="video-info">
          <h3 class="video-title">{{ selectedVideo.title }}</h3>
          <p class="video-description">
            {{ selectedVideo.description || "No description available." }}
          </p>
        </div>
      </div>

      <!-- Right: Video list -->
      <div class="video-list">
        <h3>Course Videos</h3>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="progress-text">{{ progress }}% completed</p>

        <div
          v-for="video in course?.videos"
          :key="video.key"
          class="video-item"
        >
          <span @click="playVideo(video)">{{ video.title }}</span>
          <input
            type="checkbox"
            :checked="completedVideoKeys.includes(video.key)"
            @change="toggleCompleted(video)"
            :disabled="!enrolled"
          />
          <span v-if="!enrolled" class="locked">🔒</span>
        </div>

        <!-- Enroll button if not enrolled -->
        <button v-if="!enrolled" class="enroll-btn" @click="enroll">
          Enroll to watch
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "../layout/DefaultLayout.vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import {
  getCourseById,
  enrollInCourse,
  getMyEnrolledCourses,
  getSignedVideoUrl,
  updateCourseProgress,
getCourseProgress 
} from "../api/course";
import { useAuthStore } from "../store/authStore";

const route = useRoute();
const auth = useAuthStore();

const course = ref(null);
const enrolled = ref(false);
const selectedVideo = ref(null); // currently playing video
const signedVideoUrl = ref(null); // signed URL for selected video
const progress = ref(0); // course progress in %
const completedVideoKeys = ref([]); // which videos are completed

onMounted(async () => {
  const data = await getCourseById(route.params.id);
  course.value = data.course;

  try {
    const myCourses = await getMyEnrolledCourses();
    const enrolledCourse = myCourses?.enrolledCourses.find(
      (c) => c.courseId._id === route.params.id
    );
    enrolled.value = !!enrolledCourse;

    if (enrolled.value) {
      const progressData = await getCourseProgress(route.params.id);
      progress.value = progressData.progress || 0;
      completedVideoKeys.value = progressData.completedVideos || [];
    }
  } catch (error) {
    console.error(error);
  }

  if (course.value?.videos?.length > 0) {
    selectedVideo.value = course.value.videos[0];
    if (enrolled.value) {
      await playVideo(selectedVideo.value);
    }
  }
});


const playVideo = async (video) => {
  if (!enrolled.value) return;
  try {
    const data = await getSignedVideoUrl(course.value._id, video.key);
    console.log("video:", data);

    signedVideoUrl.value = data.url;
    selectedVideo.value = video;
  } catch (error) {
    console.error(error);
  }
};

const enroll = async () => {
  try {
    await enrollInCourse(route.params.id);
    enrolled.value = true;
  } catch (error) {
    console.error(error);
  }
};

const toggleCompleted = async (video) => {
  if (!enrolled.value) return;


 try {
  const response = await updateCourseProgress(route.params.id, video.key);  
  progress.value = response.data.progress;
  completedVideoKeys.value = response.data.completedVideos || [];
} catch (error) {
  console.error(error);
}

};

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
.progress-bar {
  width: 100%;
  height: 8px;
  background: #444;
  border-radius: 4px;
  margin: 8px 0;
}

.progress-fill {
  height: 100%;
  background: #3fc488;
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #ccc;
}

</style>
