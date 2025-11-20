"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function MotionBankCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden shadow-2xl",
        "w-full max-w-[420px] aspect-[1.586/1]",
        "p-7 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d]",
        "border border-white/10 backdrop-blur-2xl",
        "flex flex-col justify-between",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.03)_40%,rgba(255,255,255,0)_80%)] opacity-40 pointer-events-none" />

      <Skeleton className="absolute top-4 right-4 h-4 w-16 rounded-md" />

      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-full mt-2" />
      </div>

      <div className="mt-6 space-y-2">
        <Skeleton className="h-5 w-56 rounded-md" />
      </div>

      <div className="flex justify-between items-end mt-6 pb-1">
        <div>
          <Skeleton className="h-3 w-20 mb-2 rounded-md" />
          <Skeleton className="h-4 w-28 rounded-md" />
        </div>

        <div className="text-right">
          <Skeleton className="h-3 w-14 mb-2 rounded-md" />
          <Skeleton className="h-4 w-10 rounded-md" />
        </div>
      </div>
    </div>
  );
}
