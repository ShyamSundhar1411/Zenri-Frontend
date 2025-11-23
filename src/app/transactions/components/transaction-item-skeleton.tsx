"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TransactionItemSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg h-9 w-9 bg-muted flex items-center justify-center">
            <Skeleton className="h-4 w-4" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-[120px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12 rounded" />
              <Skeleton className="h-3 w-10 rounded" />
              <Skeleton className="h-4 w-8 rounded" />
            </div>
          </div>
        </div>

        <Skeleton className="h-4 w-16" />
      </CardContent>
    </Card>
  );
}
