"use client";
import { Button } from "@/components/ui/button";
import { DashboardMetrics } from "./dashboard-metrics";
import { IconPlus } from "@tabler/icons-react";
import LedgerListComponent from "./ledgers-list-component";
import { useGetMyLedgers } from "@/hooks/ledger/queries/useGetMyLedgers";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { data: ledgers, isLoading, isError, error } = useGetMyLedgers();
  console.log("Ledgers", ledgers);
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear().toString();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  const filteredLedgers =
    ledgers?.filter((ledger) =>
      `${ledger.month} ${ledger.year}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) || [];
  const currentMonthLedger = ledgers?.find(
    (ledger) => ledger.month === month && ledger.year === year,
  );
  return (
    <div className="flex flex-col w-full px-4 py-6">
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <Button className="flex items-center gap-2 py-4 transition bg-foreground">
          <IconPlus className="w-4 h-4" />
          New Ledger
        </Button>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        Manage your expenses and income
      </p>
      <DashboardMetrics
        currentMonthLedger={currentMonthLedger}
        isLoading={isLoading}
        isError={isError}
      />
      <LedgerListComponent
        ledgers={filteredLedgers}
        isLoading={isLoading}
        isError={isError}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
