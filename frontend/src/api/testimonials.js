import api from './axios';

export const getPublicTestimonials = async () => {
  const response = await api.get('/api/testimonials/public');
  return response.data;
};

export const getAdminTestimonials = async () => {
  const response = await api.get('/api/testimonials');
  return response.data;
};

export const submitTestimonial = async (payload) => {
  const response = await api.post('/api/testimonials', payload);
  return response.data;
};

export const updateTestimonialStatus = async (id, status) => {
  const response = await api.patch(`/api/testimonials/${id}/status`, { status });
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await api.delete(`/api/testimonials/${id}`);
  return response.data;
};
