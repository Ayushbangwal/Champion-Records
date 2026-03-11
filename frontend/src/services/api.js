import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Sportsperson API
/*export const sportspersonAPI = {
  getAll: () => api.get('/sportspersons'),
  getById: (id) => api.get(`/sportspersons/${id}`),
  getDetails: (id) => api.get(`/sportspersons/${id}/details`),
  getStatistics: (id) => api.get(`/sportspersons/${id}/statistics`),
  getAchievements: (id) => api.get(`/sportspersons/${id}/achievements`),
  getRecords: (id) => api.get(`/sportspersons/${id}/records`),
  getAwards: (id) => api.get(`/sportspersons/${id}/awards`),
  create: (data) => api.post('/sportspersons', data),
  update: (id, data) => api.put(`/sportspersons/${id}`, data),
  delete: (id) => api.delete(`/sportspersons/${id}`),
  search: (query) => api.get(`/sportspersons/search?q=${query}`),
};
*/



export const sportspersonAPI = {
  getAll: () => api.get('/sportspersons'),
  getById: (id) => api.get(`/sportspersons/${id}`),
  getDetails: (id) => api.get(`/sportspersons/${id}/details`),
  getStatistics: (id) => api.get(`/sportspersons/${id}/statistics`),
  getAchievements: (id) => api.get(`/sportspersons/${id}/achievements`),
  getRecords: (id) => api.get(`/sportspersons/${id}/records`),
  getAwards: (id) => api.get(`/sportspersons/${id}/awards`),
  create: (data) => api.post('/sportspersons', data),
  update: (id, data) => api.put(`/sportspersons/${id}`, data),
  delete: (id) => api.delete(`/sportspersons/${id}`),
  search: (query) => api.get(`/sportspersons/search`, { params: { q: query } })
};
// Statistics API
export const statisticsAPI = {
  getBySportsperson: (sportspersonId) => api.get(`/statistics/${sportspersonId}`),
  getCareerStats: (sportspersonId) => api.get(`/statistics/${sportspersonId}/career`),
  create: (data) => api.post('/statistics', data),
  update: (id, data) => api.put(`/statistics/${id}`, data),
  delete: (id) => api.delete(`/statistics/${id}`),
};

// Achievements API
export const achievementsAPI = {
  getBySportsperson: (sportspersonId) => api.get(`/achievements/${sportspersonId}`),
  getTopAchievements: (sportspersonId, limit = 5) => 
    api.get(`/achievements/${sportspersonId}/top?limit=${limit}`),
  create: (data) => api.post('/achievements', data),
  update: (id, data) => api.put(`/achievements/${id}`, data),
  delete: (id) => api.delete(`/achievements/${id}`),
};

// Records API
export const recordsAPI = {
  getBySportsperson: (sportspersonId) => api.get(`/records/${sportspersonId}`),
  getCurrentRecords: (sportspersonId) => api.get(`/records/${sportspersonId}/current`),
  create: (data) => api.post('/records', data),
  update: (id, data) => api.put(`/records/${id}`, data),
  delete: (id) => api.delete(`/records/${id}`),
};

// Awards API
export const awardsAPI = {
  getBySportsperson: (sportspersonId) => api.get(`/awards/${sportspersonId}`),
  getRecentAwards: (sportspersonId, limit = 5) => 
    api.get(`/awards/${sportspersonId}/recent?limit=${limit}`),
  create: (data) => api.post('/awards', data),
  update: (id, data) => api.put(`/awards/${id}`, data),
  delete: (id) => api.delete(`/awards/${id}`),
};

// Sport Categories API
export const sportCategoriesAPI = {
  getAll: () => api.get('/sport-categories'),
  getById: (id) => api.get(`/sport-categories/${id}`),
  create: (data) => api.post('/sport-categories', data),
  update: (id, data) => api.put(`/sport-categories/${id}`, data),
  delete: (id) => api.delete(`/sport-categories/${id}`),
};

export default api;
