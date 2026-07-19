import axios from 'axios'

// Base URL diambil dari .env (VITE_API_BASE_URL)
// Salin .env.example jadi .env lalu sesuaikan nilainya
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor request: tempat yang pas untuk menyisipkan token auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor response: penanganan error terpusat
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server merespons dengan status di luar 2xx
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      // Request terkirim tapi tidak ada respons (masalah jaringan)
      console.error('Network Error:', error.message)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default apiClient
