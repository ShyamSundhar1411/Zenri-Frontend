import {create} from "zustand";
import type { components } from "@/types/api";

type LoginResponse = components["schemas"]["LoginResponse"];
type SignupResponse = components["schemas"]["SignupResponse"];

interface AuthState{
    user: LoginResponse["user"] | SignupResponse["user"] | null;
    token: LoginResponse["tokens"] | SignupResponse["tokens"] | null;
    isAuthenticated: boolean;
    setAuth: (data: LoginResponse | SignupResponse) => void;
    logout: () => void;
    restoreSession:() => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user:null,
    token:null,
    isAuthenticated:false,
    setAuth:(data)=>{
        set({
            user:data.user,
            token:data.tokens,
            isAuthenticated:true,
        })
        localStorage.setItem("auth",JSON.stringify(data))
    },
    logout:()=>{
        set({
            user:null,
            token:null,
            isAuthenticated:false,
        })
        localStorage.removeItem("auth")
    },
    restoreSession:()=>{
        const auth = localStorage.getItem("auth");
        if(auth){
            const data = JSON.parse(auth);
            console.log("Restoring Data",data)
            set({
                user:data.user,
                token:data.tokens,
                isAuthenticated:true,
            })
        }
    },
}))