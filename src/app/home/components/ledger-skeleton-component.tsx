"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LedgerSkeleton() {
  return (
    <div className="flex flex-col space-y-3 border ">
      <Skeleton className="h-[125px] w-[250px] rounded-xl border" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] border" />
        <Skeleton className="h-4 w-[200px] border" />
      </div>
    </div>
  );
}
