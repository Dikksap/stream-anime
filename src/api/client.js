import axios from "axios";
import RateLimiter from "../utils/rateLimiter";

// Base URL diambil dari .env (VITE_API_BASE_URL)
// Salin .env.example jadi .env lalu sesuaikan nilainya
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const limiter = new RateLimiter(30, 60000, {
  maxQueueSize: 50,
  queueTimeoutMs: 15000,
});

// Interceptor request: rate limiter (30 req/menit) + token auth
apiClient.interceptors.request.use(async (config) => {
  await limiter.acquire();

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor response: penanganan error terpusat
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.name === "RateLimitError") {
      const waitSec = Math.ceil((error.retryAfterMs || 60000) / 1000);
      error.message = `Terlalu banyak permintaan. Coba lagi dalam ${waitSec} detik.`;
      console.error("Rate Limit:", error.message);
    } else if (error.response) {
      const status = error.response.status;
      if (status >= 500) {
        error.message = "Server sedang bermasalah. Silakan coba lagi.";
      } else if (status === 429) {
        error.message =
          "Terlalu banyak permintaan. Silakan tunggu beberapa saat.";
      } else if (status === 404) {
        error.message = "Data tidak ditemukan.";
      } else if (status === 401 || status === 403) {
        error.message = "Akses ditolak. Silakan login kembali.";
      } else {
        error.message = `Terjadi kesalahan (${status}). Silakan coba lagi.`;
      }
      console.error("API Error:", status, error.response.data);
    } else if (error.request) {
      error.message = "Koneksi terputus. Periksa koneksi internet Anda.";
      console.error("Network Error:", error.message);
    } else {
      error.message =
        error.message || "Terjadi kesalahan yang tidak diketahui.";
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
