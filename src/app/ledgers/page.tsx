"use client";
import { useAuthStore } from "@/store/auth-store";
import { Loader } from "../components/loader";
import LedgerDashboard from "./components/ledger-dashboard-component";

export default function MyLedgers() {
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthLoaded || !isAuthenticated) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col h-full w-full p-6 overflow-y-auto">
      <LedgerDashboard />
    </div>
  );
}
