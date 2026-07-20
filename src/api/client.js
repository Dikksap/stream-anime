import axios from "axios";

// Base URL diambil dari .env (VITE_API_BASE_URL)
// Salin .env.example jadi .env lalu sesuaikan nilainya
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request: token auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default apiClient;
