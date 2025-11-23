"use client";

import { useState } from "react";
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

type Transaction = components["schemas"]["Transaction"];

interface TransactionListProps {
  transactions: Transaction[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
export function TransactionsList({
  transactions,
  isLoading,
  isError,
}: TransactionListProps) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sort, setSort] = useState("newest");

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <SearchBarComponent
            placeHolder="Search transactions"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="pl-9 flex-1"
          />

          <div className="flex items-center gap-3 justify-end w-full sm:w-auto sm:ml-auto flex-wrap">
            <Select onValueChange={setFilterCategory}>
              <SelectTrigger className="flex-1 min-w-[120px">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSort}>
              <SelectTrigger className="flex-1 min-w-[120px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
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
  );
}
