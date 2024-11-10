import axios from "axios";

const COMMON_BASE_URL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: COMMON_BASE_URL,
});

export const Axios = axios.create({
  baseURL: COMMON_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

Axios.interceptors.request.use((config) => {
  const { method, url } = config;
  if (process.env.NODE_ENV !== "production") {
    console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);
  }
  return config;
});
