"use client";
import { useEffect, useMemo, useState } from "react";
import { TransactionDashboardMetrics } from "./transaction-dashboard-metrics";
import { TransactionsList } from "./transactions-list";
import { toast } from "sonner";
import { useTransactionPageData } from "@/hooks/transaction/queries/useTransactionPageData";

export function TransactionDashboard() {
  const {
    transactions,
    categories,
    paymentMethods,
    subscriptions,
    isLoading,
    isError,
    error,
  } = useTransactionPageData();

  const [search, setSearch] = useState("");
  const [filterCategories, setFilterCategories] = useState<string[]>([]); // <-- multi-select
  const [sort, setSort] = useState("recent");
  const [dateFilter, setDateFilter] = useState("all");
  const [customDateRange, setCustomDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    let list = [...transactions];

    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));

    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.description?.toLowerCase().includes(q) ||
          t.amount.toString().includes(q) ||
          t.category?.categoryName?.toLowerCase().includes(q) ||
          t.paymentMethod?.providerName?.toLowerCase().includes(q),
      );
    }

    if (filterCategories.length > 0) {
      list = list.filter((t) =>
        filterCategories.includes(t.category?.categoryName!),
      );
    }

    list = list.filter((t) => {
      const txDate = new Date(t.transactedOn!);
      switch (dateFilter) {
        case "today":
          return txDate >= startOfToday;
        case "yesterday":
          return txDate >= startOfYesterday && txDate < startOfToday;
        case "this_month":
          return txDate >= startOfMonth;
        case "custom":
          if (customDateRange.from && customDateRange.to) {
            return (
              txDate >= customDateRange.from && txDate <= customDateRange.to
            );
          }
          return true;
        default:
          return true;
      }
    });

    if (sort === "asc") {
      list.sort(
        (a, b) =>
          new Date(a.transactedOn!).getTime() -
          new Date(b.transactedOn!).getTime(),
      );
    } else if (sort === "desc") {
      list.sort(
        (a, b) =>
          new Date(b.transactedOn!).getTime() -
          new Date(a.transactedOn!).getTime(),
      );
    } else if (sort === "recent") {
      list.sort(
        (a, b) =>
          new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime(),
      );
    }

    return list;
  }, [
    transactions,
    search,
    filterCategories,
    dateFilter,
    customDateRange,
    sort,
  ]);

  return (
    <div className="space-y-6">
      <TransactionDashboardMetrics
        transactions={filteredTransactions}
        isLoading={isLoading}
      />
      <TransactionsList
        transactions={filteredTransactions}
        categories={categories}
        subscriptions={subscriptions}
        isLoading={isLoading}
        paymentMethods={paymentMethods}
        isError={isError}
        search={search}
        setSearch={setSearch}
        filterCategories={filterCategories}
        setFilterCategories={setFilterCategories}
        sort={sort}
        setSort={setSort}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        customDateRange={customDateRange}
        setCustomDateRange={setCustomDateRange}
      />
    </div>
  );
}
