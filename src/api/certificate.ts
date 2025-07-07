import api from '../api'

export const getCourseCertificate = async (courseId: string) => {
  const res = await api.post(`/courses/${courseId}/generate-certificate`);
  return res.data;
}; 