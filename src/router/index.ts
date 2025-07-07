import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue"; 
import HomePage from "../pages/HomePage.vue";
import CourseDetails from "../pages/CourseDetails.vue";
import EnrolledCourses from "../pages/EnrolledCourses.vue";

import { useAuthStore } from "../store/authStore";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/courses/:id",
    name: "CourseDetails",
    component: CourseDetails,
  },
  {
    path: "/enrolled",
    name: "EnrolledCourses",
    component: EnrolledCourses,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();

  if (!auth.token && to.name !== "Login" && to.name !== "Signup") {
    // Not logged in → redirect to login
    next({ name: "Login" });
  } else if (auth.token && (to.name === "Login" || to.name === "Signup")) {
    // Already logged in → redirect to home
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
