"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./components/providers/TanstackProvider";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

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
   useEffect(() => {
    restoreSession();
  }, [restoreSession])
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          {children}
        </TanstackProvider>
        
      </body>
    </html>
  );
}
