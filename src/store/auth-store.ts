import { create } from "zustand";
import type { components } from "@/types/api";

type LoginResponse = components["schemas"]["LoginResponse"];
type SignupResponse = components["schemas"]["SignupResponse"];

interface AuthState {
  user: LoginResponse["user"] | SignupResponse["user"] | null;
  token: LoginResponse["tokens"] | SignupResponse["tokens"] | null;
  isAuthLoaded: boolean;
  isAuthenticated: boolean;
  setAuth: (data: LoginResponse | SignupResponse) => void;
  logout: () => void;
  restoreSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthLoaded: false,
  isAuthenticated: false,
  setAuth: (data) => {
    set({
      user: data.user,
      token: data.tokens,
      isAuthLoaded: true,
      isAuthenticated: true,
    });
    localStorage.setItem("auth", JSON.stringify(data));
  },
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthLoaded: true,
      isAuthenticated: false,
    });
    console.log("Logged Out");
    localStorage.removeItem("auth");
  },
  restoreSession: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const data = JSON.parse(auth);
      console.log("Restoring Data", data);
      set({
        user: data.user,
        token: data.tokens,
        isAuthLoaded: true,
        isAuthenticated: true,
      });
    } else {
      set({
        user: null,
        token: null,
        isAuthLoaded: true,
        isAuthenticated: false,
      });
    }
  },
}));
