"use client";
import { useAuthStore } from "@/store/auth-store";
import { WelcomeMessage } from "./components/welcome-message";
import LedgerListComponent from "./components/ledgers-list-component";
import { Loader } from "../components/loader";
import DashboardComponent from "./components/dashboard-component";

export default function Home() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthLoaded || !isAuthenticated) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-start justify-center h-full w-full p-6">
      <WelcomeMessage />
      <DashboardComponent />
      <LedgerListComponent />
    </div>
  );
}
