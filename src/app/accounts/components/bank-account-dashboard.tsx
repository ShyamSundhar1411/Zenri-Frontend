import { SearchBarComponent } from "@/app/components/search-bar";
import { Button } from "@/components/ui/button";
import { useGetMyBankAccounts } from "@/hooks/account/queries/useGetMyBankAccounts";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BankAccountCardSkeleton } from "./bank-account-skeleton-component";
import { BankAccountCard } from "./bank-account-card-component";
export function BankAccountDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: bankAccounts,
    isLoading,
    isError,
    error,
  } = useGetMyBankAccounts();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  const filteredBankAccounts =
    bankAccounts?.filter((bankAccount) =>
      `${bankAccount.accountNumber} ${bankAccount.accountType}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <div className="flex flex-col items-start w-full py-6">
      <div className="flex flex-col w-full px-4">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <SearchBarComponent
            placeHolder="Search account"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />

          <Button className="flex items-center gap-2 rounded-lg">
            <IconPlus size={20} />
            Add Account
          </Button>
        </div>
      </div>

      <div className="mt-6 w-full px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BankAccountCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBankAccounts.map((bankAccount, index) => (
              <BankAccountCard key={index} account={bankAccount} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
