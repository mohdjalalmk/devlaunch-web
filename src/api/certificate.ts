import api from '../api'

export const getCourseCertificate = async (courseId) => {
  const res = await api.post(`/courses/${courseId}/generate-certificate`);
  return res.data;
}; 