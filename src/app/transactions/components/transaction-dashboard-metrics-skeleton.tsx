"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TransactionDashboardMetricsSkeleton() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3 mt-4">
      {Array(4)
        .fill(0)
        .map((_, idx) => (
          <Card
            key={idx}
            className="p-4 rounded-2xl border border-accent-foreground shadow-sm"
          >
            <CardContent className="flex flex-col gap-2 mt-2 mb-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>

              <Skeleton className="h-8 w-32 rounded mt-2" />

              <Skeleton className="h-4 w-20 rounded mt-1" />
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
