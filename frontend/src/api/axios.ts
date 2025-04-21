import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("paytm-jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

const authApi = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export { api, authApi };
