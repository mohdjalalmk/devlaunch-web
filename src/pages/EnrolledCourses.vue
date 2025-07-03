<template>
  <DefaultLayout>
    <div class="enrolled-courses-page">
      <h2>My Enrolled Courses</h2>

      <div v-if="courses.length > 0" class="courses-grid">
        <div
          v-for="course in courses"
          :key="course.courseId._id"
          class="course-card"
          @click="viewCourse(course.courseId._id)"
        >
          <img
            :src="course.courseId.thumbnail"
            alt="thumbnail"
            class="thumbnail"
          />
          <h4>{{ course.courseId.title }}</h4>

          <div class="progress-container">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: course.progress + '%' }"
              ></div>
            </div>
            <span class="progress-text">{{ course.progress }}%</span>
          </div>
        </div>
      </div>
      <p v-else class="empty-text">You haven't enrolled in any courses yet.</p>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import { getMyEnrolledCourses } from "../api/course";
import { useRouter } from "vue-router";

const courses = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const data = await getMyEnrolledCourses();
    console.log("data:", data);

    courses.value = data.enrolledCourses;
  } catch (error) {
    console.error(error);
  }
});

const viewCourse = (courseId) => {
  router.push(`/courses/${courseId}`);
};
</script>

<style scoped>
.enrolled-courses-page {
  padding: 20px;
  color: #f0f0f0;
}

h2 {
  margin-bottom: 16px;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.course-card {
  background: #2c2c2c;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
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
}
.progress-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #444;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3fc488;
  width: 0%;
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #ccc;
  min-width: 24px;
}

.empty-text {
  color: #aaa;
  font-size: 14px;
}
</style>
