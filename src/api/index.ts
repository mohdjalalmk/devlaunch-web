import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  // For running locally
  // baseURL:"http://localhost:8080",
  baseURL: apiBaseUrl,
});

// Add token to request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
