import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import HomePage from "../pages/HomePage.vue";
import { useAuthStore } from "../store/authStore";
import CourseDetails from '../pages/CourseDetails.vue' // 👈 import

const routes = [
  { path: "/", name: "Login", component: LoginPage },
  { path: "/home", name: "Home", component: HomePage },
  {
    path: '/courses/:id',
    name: 'CourseDetails',
    component: CourseDetails
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.name !== "Login" && !auth.token) {
    next({ name: "Login" });
  } else if (to.name === "Login" && auth.token) {
    next({ name: "Home" }); // redirect logged-in user to home
  } else {
    next();
  }
});

export default router;
