import api from '../api'

// Get all courses
export async function getAllCourses({ search = '', page = 1, limit = 10 } = {}) {
  const response = await api.get('/courses', {
    params: { search, page, limit }
  });
  return response.data;
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


export const getSignedVideoUrl = async (courseId, key) => {
  const res = await api.get(`/courses/${courseId}/videos/signed-url`, {
    params: { key }
  })
  return res.data // assuming your backend returns { signedUrl: '...' }
}

export const updateCourseProgress = async (courseId, videoKey) =>{
const res=   await api.patch(`/user/me/courses/${courseId}/?videoKey=${videoKey}`);
return res.data

}

export const getCourseProgress = async (courseId) => {
  const res = await api.get(`/user/me/courses/${courseId}/progress`);
  return res.data;
}; 