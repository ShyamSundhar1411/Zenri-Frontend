"use client";
import { useLedgers } from "@/hooks/ledger/useLedgers";
import { useAuthStore } from "@/store/auth-store";
import { WelcomeMessage } from "./components/welcome-message";
import LedgerListComponent from "./components/ledgers-list-component";
import { Loader } from "../components/loader";


export default function Home() {
  const isAuthLoaded = useAuthStore.getState().isAuthLoaded;
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (!isAuthLoaded || !isAuthLoaded) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-start justify-center h-full w-full p-6">



      <WelcomeMessage />
      <LedgerListComponent />



    </div>
  );
}
