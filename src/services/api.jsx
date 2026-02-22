import axios from "axios";

/**
 * ✅ VITE ENV VARIABLES
 * Always use import.meta.env in Vite
 */
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 5000);

/**
 * ✅ AXIOS INSTANCE
 */
const API = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ✅ REQUEST INTERCEPTOR
 * Attach token safely
 */
API.interceptors.request.use(
  (config) => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const user = JSON.parse(rawUser);

        if (user?.token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (err) {
      console.warn("⚠️ Invalid user in localStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ✅ RESPONSE INTERCEPTOR
 * Global error handling
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    /**
     * 🔐 Unauthorized → logout safely
     */
    if (status === 401) {
      localStorage.removeItem("user");

      // prevent infinite redirect loop
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    /**
     * ⏱ Timeout handling
     */
    if (error.code === "ECONNABORTED") {
      console.error("⏱ Request timeout:", error.message);
      return Promise.reject({
        ...error,
        message: "Request timeout. Please try again.",
      });
    }

    /**
     * 🌐 Network error
     */
    if (!error.response) {
      console.error("🌐 Network error:", error.message);
      return Promise.reject({
        ...error,
        message: "Network error. Please check your connection.",
      });
    }

    /**
     * 📦 Backend error message passthrough
     */
    const serverMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong";

    return Promise.reject({
      ...error,
      message: serverMessage,
    });
  }
);

export default API;