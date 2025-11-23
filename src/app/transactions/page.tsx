import { Button } from "@/components/ui/button";
import { TransactionDashboard } from "./components/transaction-dashboard";
import { IconPlus } from "@tabler/icons-react";

export default function MyTransactions() {
  return (
    <div className="flex flex-col justify-start h-full w-full p-6">
      <div className="flex flex-col w-full px-4 py-6">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-foreground">
            My Transactions
          </h1>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Complete transaction history across all periods
        </p>
      </div>
      <TransactionDashboard />
    </div>
  );
}
