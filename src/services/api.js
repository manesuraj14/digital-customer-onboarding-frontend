import axios from "axios";

// Get API configuration from environment variables
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || "5000", 10);

// Create axios instance with configuration
const API = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});

// Request interceptor - Add auth token
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Handle timeout
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout:", error.message);
      return Promise.reject({
        ...error,
        message: "Request timeout. Please try again.",
      });
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject({
        ...error,
        message: "Network error. Please check your connection.",
      });
    }

    return Promise.reject(error);
  }
);

export default API;
