"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SubscriptionSkeleton() {
  return (
    <div className="border rounded-2xl p-6 shadow-sm bg-white dark:bg-neutral-900 space-y-4 w-full max-w-sm">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-24" />
      </div>

      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}
