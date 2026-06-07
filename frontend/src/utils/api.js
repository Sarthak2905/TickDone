import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken }
        );

        const { accessToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = "Bearer " + accessToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email, password) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (name, email, password, confirmPassword) => {
  const response = await apiClient.post("/auth/register", {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const refreshTokenAPI = async (refreshToken) => {
  const response = await apiClient.post("/auth/refresh-token", { refreshToken });
  return response.data;
};

// Projects APIs
export const getProjects = async (featured = false) => {
  const response = await apiClient.get(`/projects?featured=${featured}`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await apiClient.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await apiClient.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await apiClient.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await apiClient.delete(`/projects/${id}`);
  return response.data;
};

// Blog APIs
export const getBlogPosts = async (published = false) => {
  const response = await apiClient.get(`/blog?published=${published}`);
  return response.data;
};

export const getBlogPostById = async (id) => {
  const response = await apiClient.get(`/blog/${id}`);
  return response.data;
};

export const getBlogPostBySlug = async (slug) => {
  const response = await apiClient.get(`/blog/slug/${slug}`);
  return response.data;
};

export const createBlogPost = async (postData) => {
  const response = await apiClient.post("/blog", postData);
  return response.data;
};

export const updateBlogPost = async (id, postData) => {
  const response = await apiClient.put(`/blog/${id}`, postData);
  return response.data;
};

export const deleteBlogPost = async (id) => {
  const response = await apiClient.delete(`/blog/${id}`);
  return response.data;
};

// Inquiries APIs
export const createInquiry = async (inquiryData) => {
  const response = await apiClient.post("/inquiries", inquiryData);
  return response.data;
};

export const getInquiries = async () => {
  const response = await apiClient.get("/inquiries");
  return response.data;
};

export const getInquiryById = async (id) => {
  const response = await apiClient.get(`/inquiries/${id}`);
  return response.data;
};

export const updateInquiry = async (id, inquiryData) => {
  const response = await apiClient.put(`/inquiries/${id}`, inquiryData);
  return response.data;
};

export const deleteInquiry = async (id) => {
  const response = await apiClient.delete(`/inquiries/${id}`);
  return response.data;
};

// Appointments APIs
export const createAppointment = async (appointmentData) => {
  const response = await apiClient.post("/appointments", appointmentData);
  return response.data;
};

export const getAppointments = async () => {
  const response = await apiClient.get("/appointments");
  return response.data;
};

export const getAppointmentById = async (id) => {
  const response = await apiClient.get(`/appointments/${id}`);
  return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
  const response = await apiClient.put(`/appointments/${id}`, appointmentData);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await apiClient.delete(`/appointments/${id}`);
  return response.data;
};

// Testimonials APIs
export const getTestimonials = async (published = false, featured = false) => {
  const response = await apiClient.get(`/testimonials?published=${published}&featured=${featured}`);
  return response.data;
};

export const getTestimonialById = async (id) => {
  const response = await apiClient.get(`/testimonials/${id}`);
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await apiClient.post("/testimonials", testimonialData);
  return response.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const response = await apiClient.put(`/testimonials/${id}`, testimonialData);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await apiClient.delete(`/testimonials/${id}`);
  return response.data;
};

export default apiClient;

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const refreshTokenAPI = async (refreshToken) => {
  const response = await apiClient.post("/auth/refresh-token", { refreshToken });
  return response.data;
};

export default apiClient;