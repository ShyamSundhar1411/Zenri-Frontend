"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LedgerSkeleton() {
  return (
    <div className="w-full sm:w-[300px] border rounded-xl shadow-sm p-4 space-y-4 bg-white dark:bg-neutral-900">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-4 w-28" />
        </div>

        <Skeleton className="h-6 w-32 rounded-md" />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
