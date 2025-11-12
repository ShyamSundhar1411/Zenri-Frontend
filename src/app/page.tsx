"use client";
import { useAuthStore } from "@/store/auth-store";


export default function Home() {
  const user = useAuthStore((state) => state.user)
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
    </div>
  );
}
