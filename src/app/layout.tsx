"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./components/providers/TanstackProvider";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import { SideBarComponent } from "./components/side-bar";
import { Toaster } from "@/components/ui/sonner";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);
  useEffect(() => {
    if (isAuthLoaded && !isAuthenticated && pathname !== "/auth/login") {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, pathname, isAuthLoaded, router]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <div className="flex">
            {isAuthenticated && <SideBarComponent />}
            <main className="flex-1 overflow-y-auto flex items-center justify-center">
              {children}

              <Toaster />
            </main>
          </div>
        </TanstackProvider>
      </body>
    </html>
  );
}
