import api from '../api'

// Get all courses
export async function getAllCourses() {
  const response = await api.get('/courses')
  return response.data
}

// Get specific course by id
export async function getCourseById(courseId) {
  const response = await api.get(`/courses/${courseId}`)
  return response.data
}

// Enroll in a course
export async function enrollInCourse(courseId) {
  const response = await api.post(`/user/courses/enroll/${courseId}`)
  return response.data
}


//get enrolled course
export async function getMyEnrolledCourses() {
  const response = await api.get(`/user/me/courses`)
  return response.data
}

