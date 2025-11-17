"use client";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";

export function WelcomeMessage() {
  const user = useAuthStore((state) => state.user);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setMessage("Good Morning");
    else if (hour < 18) setMessage("Good Afternoon");
    else setMessage("Good Evening");
  }, []);

  return (
    <div className="flex flex-col items-start justify-center px-4 py-10 w-full">
      <h1
        className="
          font-bold text-gray-800 dark:text-white
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          leading-tight
        "
      >
        {message} 👋
      </h1>

      <h2
        className="
        font-semibold text-gray-700 dark:text-gray-300
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl
        "
      >
        {user?.userName || ""}
      </h2>

      <p
        className="
          mt-4 text-base sm:text-lg md:text-xl
          text-gray-600 dark:text-gray-400 tracking-wide
        "
      >
        Hope you're having a productive day!
      </p>
    </div>
  );
}
