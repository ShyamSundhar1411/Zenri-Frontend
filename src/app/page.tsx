"use client";
import { useLedgers } from "@/hooks/ledger/useLedgers";
import { useAuthStore } from "@/store/auth-store";


export default function Home() {
  const user = useAuthStore((state) => state.user)
  const { data: ledgers, isLoading, isError, error } = useLedgers();
  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Zenri!</h1>

        {user ? (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
        {isLoading ? (
          <p>Loading ledgers...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Your Ledgers</h2>
            <ul className="space-y-2">
              {ledgers?.map((ledger) => (
                <li key={ledger.id} className="border p-3 rounded-md">
                  {ledger.month} {ledger.year}
                </li>
              ))}
            </ul>
          </div>
        )}

    </div>

  );
}
