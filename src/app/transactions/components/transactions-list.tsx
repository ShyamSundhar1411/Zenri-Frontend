"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { SearchBarComponent } from "@/app/components/search-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { components } from "@/types/api";
import { ArrowUpDown, Filter } from "lucide-react";
import { TransactionItem } from "./transaction-item";
import { TransactionItemSkeleton } from "./transaction-item-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { AddTransactionModal } from "./add-transaction-modal";
import { useCreateTransaction } from "@/hooks/transaction/mutations/useCreateTransaction";
import { FilterPopover } from "@/app/components/filter-popover";

type Transaction = components["schemas"]["Transaction"];
type Category = components["schemas"]["Category"];
type PaymentMethod = components["schemas"]["PaymentMethod"];
type Subscription = components["schemas"]["Subscription"];

interface TransactionListProps {
  transactions: Transaction[] | undefined;
  categories: Category[] | undefined;
  paymentMethods: PaymentMethod[] | undefined;
  subscriptions: Subscription[] | undefined;
  isLoading: boolean;
  isError: boolean;
  search: string;
  setSearch: (search: string) => void;
  filterCategories: string[]; // <-- multi-select
  setFilterCategories: (filterCategories: string[]) => void;
  sort: string;
  setSort: (sort: string) => void;
  dateFilter: string;
  setDateFilter: (dateFilter: string) => void;
  customDateRange: { from?: Date; to?: Date };
  setCustomDateRange: (customDateRange: { from?: Date; to?: Date }) => void;
}

export function TransactionsList({
  transactions,
  categories,
  paymentMethods,
  subscriptions,
  isLoading,
  isError,
  search,
  setSearch,
  filterCategories,
  setFilterCategories,
  sort,
  setSort,
  dateFilter,
  setDateFilter,
  customDateRange,
  setCustomDateRange,
}: TransactionListProps) {
  const [open, setOpen] = useState(false);
  const createTransaction = useCreateTransaction();

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBarComponent
              placeHolder="Search transactions"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="pl-9"
            />

            <div className="flex items-center gap-3 justify-end w-full sm:w-auto sm:ml-auto flex-wrap">
              <Button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 py-4 transition bg-foreground"
              >
                <IconPlus className="w-4 h-4" />
                Add Transaction
              </Button>

              <FilterPopover
                options={categories?.map((c) => c.categoryName) || []}
                selectedOptions={filterCategories}
                setSelectedOptions={setFilterCategories}
                title="Categories"
                buttonLabel="Categories"
              />

              <Select onValueChange={setDateFilter}>
                <SelectTrigger className="flex-1 min-w-[140px]">
                  <SelectValue placeholder="Date Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setSort}>
                <SelectTrigger className="flex-1 min-w-[120px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {dateFilter === "custom" && (
            <div className="flex items-center gap-2 mb-4">
              <label className="text-sm font-medium">From:</label>
              <input
                type="date"
                className="border rounded p-2"
                value={customDateRange.from?.toISOString().split("T")[0] || ""}
                onChange={(e) =>
                  setCustomDateRange({
                    from: e.target.value ? new Date(e.target.value) : undefined,
                    to: customDateRange.to,
                  })
                }
              />
              <span className="px-1">to</span>
              <label className="text-sm font-medium">To:</label>
              <input
                type="date"
                className="border rounded p-2"
                value={customDateRange.to?.toISOString().split("T")[0] || ""}
                onChange={(e) =>
                  setCustomDateRange({
                    from: customDateRange.from,
                    to: e.target.value ? new Date(e.target.value) : undefined,
                  })
                }
              />
            </div>
          )}

          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-2 pb-4 pr-8 pl-8">
              {isLoading && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-32 rounded-full" />
                  </div>
                  {[...Array(6)].map((_, i) => (
                    <TransactionItemSkeleton key={i} />
                  ))}
                </>
              )}

              {transactions && (
                <>
                  <div className="flex items-center justify-between pb-2 pl-2 pr-2">
                    <h3 className="text-lg font-semibold">
                      {transactions.length} Transactions
                    </h3>
                    <Badge variant="outline">Sorted by date {sort}</Badge>
                  </div>
                  {transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <AddTransactionModal
        open={open}
        onOpenChange={setOpen}
        categories={categories || []}
        paymentMethods={paymentMethods || []}
        subscriptions={subscriptions || []}
        onSubmit={async (data) => {
          await createTransaction.mutateAsync(data);
          setOpen(false);
        }}
      />
    </>
  );
}
