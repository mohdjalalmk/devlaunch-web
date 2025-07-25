import api from '../api';

// === Interfaces ===
export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  isFree: boolean;
  price: number;
  thumbnail: string;
  creator: { _id: string; name: string };
  isPublished: boolean;
  totalEnrollments: number;
  avgProgress: number;
}

export interface EnrolledCourse {
  courseId: string; 
  progress: number;
  completedVideos: Array<{ key: string }>;
}

export interface GetAllCoursesResponse {
  courses: Course[];
  page: number;
  totalPages: number;
  totalCourses: number;
}

// === API functions ===

// Get all courses
export async function getAllCourses({
  search = '',
  page = 1,
  limit = 10
} = {}): Promise<GetAllCoursesResponse> {
  const response = await api.get<GetAllCoursesResponse>('/courses', {
    params: { search, page, limit }
  });
  return response.data;
}

// Get specific course by id
export async function getCourseById(courseId: string): Promise<{ course: Course }> {
  const response = await api.get<{ course: Course }>(`/courses/${courseId}`);
  return response.data;
}

// Enroll in a course
export async function enrollInCourse(courseId: string): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>(`/user/courses/enroll/${courseId}`);
  return response.data;
}

export async function getMyEnrolledCourses(): Promise<{ enrolledCourses: EnrolledCourse[] }> {
  const response = await api.get<{ enrolledCourses: EnrolledCourse[] }>(`/user/me/courses`);
  return response.data;
}
// Get enrolled courses


// Get signed video URL
export async function getSignedVideoUrl(courseId: string, key: string): Promise<{ signedUrl: string }> {
  const response = await api.get<{ signedUrl: string }>(`/courses/${courseId}/videos/signed-url`, {
    params: { key }
  });
  return response.data;
}

// Update course progress
export async function updateCourseProgress(courseId: string, videoKey: string): Promise<{
  message: string;
  data: { progress: number; completedVideos: Array<{ key: string }> };
}> {
  const response = await api.patch(`/user/me/courses/${courseId}/?videoKey=${videoKey}`);
  return response.data;
}

// Get course progress
export async function getCourseProgress(courseId: string): Promise<{
  courseId: string;
  progress: number;
  completedVideos: Array<{ key: string }>;
}> {
  const response = await api.get(`/user/me/courses/${courseId}/progress`);
  return response.data;
}
