import { create } from "zustand";
import type { components } from "@/types/api";
import { isAccessTokenExpired } from "@/lib/jwt-utils";
import { LoginResponse, SignupResponse, TokenResponse } from "@/di/auth";

interface AuthState {
  user: LoginResponse["user"] | SignupResponse["user"] | null;
  tokens: LoginResponse["tokens"] | SignupResponse["tokens"] | null;
  isAuthLoaded: boolean;
  isAuthenticated: boolean;
  setAuth: (data: LoginResponse | SignupResponse) => void;
  refreshSession: (data: TokenResponse) => void;
  logout: () => void;
  restoreSession: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthLoaded: false,
  isAuthenticated: false,
  setAuth: (data) => {
    set({
      user: data.user,
      tokens: data.tokens,
      isAuthLoaded: true,
      isAuthenticated: true,
    });
    localStorage.setItem("auth", JSON.stringify(data));
  },
  logout: () => {
    set({
      user: null,
      tokens: null,
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
        tokens: data.tokens,
        isAuthLoaded: true,
        isAuthenticated: true,
      });
    } else {
      set({
        user: null,
        tokens: null,
        isAuthLoaded: true,
        isAuthenticated: false,
      });
    }
  },
  refreshSession: (newTokens) => {
    const current = get();

    const updated = {
      user: current.user,
      tokens: {
        ...current.tokens,
        ...newTokens,
      },
    };

    set({
      tokens: updated.tokens,
    });

    localStorage.setItem("auth", JSON.stringify(updated));
  },
}));
