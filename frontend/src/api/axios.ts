import axios from "axios";
import getCookie from "../utils/getCookie";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token = getCookie("paytm-jwt");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

const authApi = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})


export { api, authApi };