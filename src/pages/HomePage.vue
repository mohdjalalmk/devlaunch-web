<template>
  <DefaultLayout>
    <div class="page-head">
 <h2>All Courses</h2>
   <input
  v-model="search"
  placeholder="Search courses..."
  class="search-input"
/>
    </div>
   
    <hr class="divider" />

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
          @click="viewCourse(course._id)"
        />
      </div>
    </div>
  </DefaultLayout>
</template>


<script setup>
import { ref, onMounted, watch } from "vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import CourseCard from "../components/CourseCard.vue";
import { getAllCourses, getMyEnrolledCourses } from "../api/course";
import { useRouter } from "vue-router";
import debounce from "lodash.debounce";

const router = useRouter();
const categories = ref([]);
const enrolledCourseIds = ref([]);

const search = ref('');
const page = ref(1);
const limit = ref(10);

const fetchCourses = async () => {
  try {
    const courses = await getAllCourses({ search: search.value, page: page.value, limit: limit.value });
    categories.value = groupByCategory(courses.courses);
  } catch (error) {
  }
};

onMounted(async () => {
  await fetchCourses();

  try {
    const enrolled = await getMyEnrolledCourses();
    enrolledCourseIds.value = enrolled?.enrolledCourses.map((c) => c.courseId._id);
  } catch (error) {
  }
});

// Debounced version of fetchCourses
const debouncedFetchCourses = debounce(fetchCourses, 400);

watch(search, () => {
  debouncedFetchCourses();
});

const viewCourse = (courseId) => {
  router.push(`/courses/${courseId}`);
};

function groupByCategory(courses) {
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
.page-head {
  display: flex;
  justify-content: space-between; 
  align-items: center;           
  margin-bottom: 16px;        
}

.course-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.search-input {
  padding: 8px;
  margin-bottom: 16px;
  width: 300px;
  border: 1px solid #555;
  background-color: #2c2c2c;
  color: #f0f0f0;
  border-radius: 4px;
}
</style>
