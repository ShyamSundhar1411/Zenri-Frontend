"use client";
import { SearchBarComponent } from "@/app/components/search-bar";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export function PaymentMethodDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col w-full px-4">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <SearchBarComponent
            placeHolder="Search for a payment method"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <Button className="flex items-center gap-2 rounded-lg">
            <IconPlus size={20} />
            Add Payment Method
          </Button>
        </div>
      </div>
    </div>
  );
}
