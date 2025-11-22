"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BankAccountCardSkeletonProps {
  className?: string;
}

export function BankAccountCardSkeleton({
  className,
}: BankAccountCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
      className="w-full"
    >
      <Card
        className={cn(
          "rounded-2xl border bg-white dark:bg-neutral-900 shadow-sm w-full",
          className,
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-xl" />

            <div>
              <Skeleton className="h-4 w-32 mb-2 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>

          <Skeleton className="h-6 w-16 rounded-full" />
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>

          <div className="flex items-center justify-between pt-1">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-6 w-32 rounded-md" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
