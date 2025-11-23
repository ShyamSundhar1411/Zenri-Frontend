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

type Transaction = components["schemas"]["Transaction"];
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    amount: 65000,
    currencyCode: "₹",
    transactionType: "CREDIT",
    categoryId: "Salary",
    description: "Salary",
    transactedOn: "2024-11-15",
    ledgerId: "",
    userId: "",
    isDeleted: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    amount: 3500,
    currencyCode: "₹",
    transactionType: "DEBIT",
    categoryId: "Grocery",
    description: "Grocery Shopping",
    transactedOn: "2024-11-14",
    ledgerId: "",
    userId: "",
    isDeleted: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    amount: 450,
    currencyCode: "₹",
    transactionType: "DEBIT",
    categoryId: "Food",
    description: "Coffee",
    transactedOn: "2024-11-13",
    ledgerId: "",
    userId: "",
    isDeleted: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    amount: 2800,
    currencyCode: "₹",
    transactionType: "DEBIT",
    categoryId: "Utilities",
    description: "Electricity Bill",
    transactedOn: "2024-11-12",
    ledgerId: "",
    userId: "",
    isDeleted: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    amount: 2500,
    currencyCode: "₹",
    transactionType: "DEBIT",
    categoryId: "Transport",
    description: "Fuel",
    transactedOn: "2024-11-11",
    ledgerId: "",
    userId: "",
    isDeleted: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    amount: 599,
    currencyCode: "₹",
    transactionType: "DEBIT",
    categoryId: "Bills",
    description: "Phone Recharge",
    transactedOn: "2024-11-10",
    ledgerId: "",
    userId: "",
    isDeleted: false,
    createdAt: "",
    updatedAt: "",
  },
];
export function TransactionsList() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sort, setSort] = useState("newest");
  const filteredTransactions = DUMMY_TRANSACTIONS;
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
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">16 Transactions</h3>
              <Badge variant="outline">Sorted by date {sort}</Badge>
            </div>
            {filteredTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
