"use client";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import type { components, APIResponse } from "@/types/api";
import { useAuthStore } from "@/store/auth-store";


type LoginRequest = components["schemas"]["LoginRequest"];
type LoginResponse = components["schemas"]["LoginResponse"];

export function useLogin(){
    
    const setAuth = useAuthStore((state) => state.setAuth);
    
    
    return useMutation<LoginResponse,Error,LoginRequest>({
        mutationFn:(data)=>login(data),
        onSuccess: (data) => {
            setAuth(data);
        }
    })
}