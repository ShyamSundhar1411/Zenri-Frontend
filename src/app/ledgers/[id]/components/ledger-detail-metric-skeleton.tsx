"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LedgerDetaildMetricsSkeleton() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-4 mt-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Card
            key={i}
            className="p-4 rounded-2xl shadow-sm transition-shadow duration-200 border border-accent-foreground"
          >
            <CardContent className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>

              <Skeleton className="h-8 w-32 rounded" />

              <Skeleton className="h-4 w-28 rounded" />
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
