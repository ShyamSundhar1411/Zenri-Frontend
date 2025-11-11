import axios from "axios";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Axios instance — used everywhere in your frontend
export const api = axios.create({
  baseURL: API_URL,
  withCredentials:false,
  headers: {
    "Content-Type": "application/json",
  },
});