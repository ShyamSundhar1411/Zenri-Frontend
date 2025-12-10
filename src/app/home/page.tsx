"use client";
import { useAuthStore } from "@/store/auth-store";
import { Loader } from "../components/loader";
import { WelcomeMessage } from "./components/welcome-message";

export default function Home() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthLoaded || !isAuthenticated) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col h-full w-full p-6 overflow-y-auto">
      <WelcomeMessage />
    </div>
  );
}
