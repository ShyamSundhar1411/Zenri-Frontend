import { api } from "./apiClient";
import { components } from "@/types/api";

type LoginRequest = components["schemas"]["LoginRequest"];
type LoginResponse = components["schemas"]["LoginResponse"];


export async function login(data:LoginRequest): Promise<LoginResponse>{
    const res = await api.post("/api/v1/auth/login", data);
    return res.data
}