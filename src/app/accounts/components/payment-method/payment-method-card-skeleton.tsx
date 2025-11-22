"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentMethodCardSkeleton() {
  return (
    <Card className="border border-gray-200">
      <div className="flex flex-col justify-center pl-4">
        <CardHeader className="p-2 space-y-2">
          <CardTitle>
            <Skeleton className="h-5 w-40" />
          </CardTitle>

          <div className="flex flex-row gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-28 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>

          <CardDescription>
            <Skeleton className="h-4 w-56" />
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-32 mt-1" />
        </CardContent>

        <div className="flex flex-row gap-2 pl-2 pb-2 justify-start">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
