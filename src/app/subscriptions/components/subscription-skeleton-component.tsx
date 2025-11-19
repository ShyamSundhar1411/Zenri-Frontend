"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SubscriptionSkeleton() {
  return (
    <Card className="rounded-lg border border-foreground shadow-sm animate-pulse w-full">
      <CardHeader className="flex items-start justify-between gap-4 pb-2">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <Skeleton className="h-4 w-full" /> {/* Subscribed On */}
          <Skeleton className="h-4 w-full" /> {/* Expires On */}
          <Skeleton className="h-4 w-full" /> {/* Last Billed At */}
          <Skeleton className="h-4 w-full" /> {/* Next Billing Date */}
        </div>
      </CardContent>
    </Card>
  );
}
