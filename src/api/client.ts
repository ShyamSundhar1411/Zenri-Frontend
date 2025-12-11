import axios from "axios";
import { components } from "@/types/api";

type Tokens = components["schemas"]["Tokens"];
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Axios instance — used everywhere in your frontend
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("auth");
      if (auth) {
        try {
          const data = JSON.parse(auth);
          const token: Tokens = data.tokens;
          if (token?.accessToken) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
          }
        } catch (err) {
          console.warn("Invalid auth token format in localStorage");
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
