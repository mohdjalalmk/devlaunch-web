<template>
  <DefaultLayout>
    <h2>All Courses</h2>
    <div
      v-for="category in categories"
      :key="category.name"
      class="category-section"
    >
      <h3>{{ category.name }}</h3>
      <div class="course-list">
        <CourseCard
          v-for="course in category.courses"
          :key="course.id"
          :course="course"
          :enrolled="enrolledCourseIds.includes(course._id)"
          @click="viewCourse(course.id)"
        />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import CourseCard from "../components/CourseCard.vue";
import { getAllCourses, getMyEnrolledCourses } from "../api/course";
import { useRouter } from "vue-router";

const router = useRouter();
const categories = ref([]);
const enrolledCourseIds = ref([]);

onMounted(async () => {
  try {
    const courses = await getAllCourses();
    categories.value = groupByCategory(courses.courses);

    const enrolled = await getMyEnrolledCourses();
    console.log("enrolled:", enrolled);

    enrolledCourseIds.value = enrolled?.enrolledCourses.map((c) => c.courseId._id);
  } catch (error) {}
});


const viewCourse = (courseId) => {
  router.push(`/courses/${courseId}`);
};

function groupByCategory(courses) {
  // group courses by category
  const map = {};
  courses.forEach((course) => {
    if (!map[course.category]) map[course.category] = [];
    map[course.category].push(course);
  });
  return Object.keys(map).map((name) => ({
    name,
    courses: map[name],
  }));
}
</script>

<style scoped>
.course-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
