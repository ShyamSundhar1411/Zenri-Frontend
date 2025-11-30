"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LedgerSkeleton() {
  return (
    <div className="w-full sm:w-[300px] border border-foreground rounded-xl shadow-sm p-4 space-y-4 bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="space-y-3">
        {/* Month + Year + Trend Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4">
        {/* Net Balance row */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Progress bar */}
        <Skeleton className="h-3 w-full rounded-full" />

        {/* Inflow + Outflow */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
