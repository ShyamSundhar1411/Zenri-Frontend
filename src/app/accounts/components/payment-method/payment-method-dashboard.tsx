"use client";
import { SearchBarComponent } from "@/app/components/search-bar";
import { Button } from "@/components/ui/button";
import { useGetMyPaymentMethods } from "@/hooks/account/queries/useGetMyPaymentMethods";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PaymentMethodCardSkeleton } from "./payment-method-card-skeleton";
import { PaymentMethodCard } from "./payment-method-card";

export function PaymentMethodDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: paymentMethods,
    isLoading,
    isError,
    error,
  } = useGetMyPaymentMethods();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);
  return (
    <div className="flex flex-col items-start w-full py-6">
      <div className="flex flex-col w-full px-4">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <SearchBarComponent
            placeHolder="Search for a payment method"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <Button className="flex items-center gap-2 rounded-lg bg-foreground">
            <IconPlus size={20} />
            Add Payment Method
          </Button>
        </div>
      </div>
      <div className="mt-6 w-full px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PaymentMethodCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {paymentMethods?.map((method, index) => (
              <PaymentMethodCard
                method={method}
                key={index}
                onDelete={() => {
                  console.log("Delete");
                }}
                onEdit={() => {
                  console.log("Edit");
                }}
                onSetDefault={() => console.log("Set Default")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
