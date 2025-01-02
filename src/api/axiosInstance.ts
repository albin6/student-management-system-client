import { useUserStore } from "@/zustand/store";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.message === "You are blocked.") {
      const { clearUser } = useUserStore();
      clearUser();
    }
    return Promise.reject(error);
  }
);
