"use client";

import { JSX, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Filter,
  TrendingUp,
  Coffee,
  ShoppingBag,
  Home,
  Car,
  ArrowUpDown,
} from "lucide-react";
import { SearchBarComponent } from "@/app/components/search-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { components } from "@/types/api";

type Transaction = components["schemas"]["Transaction"];

export function TransactionsList() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sort, setSort] = useState("newest");
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col justify-between sm:flex-row gap-4">
          <div className="flex flex-row w-full">
            <SearchBarComponent
              placeHolder="Search transactions"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="pl-9"
            />
          </div>
          <Select onValueChange={setFilterCategory}>
            <SelectTrigger>
              <Filter />
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSort}>
            <SelectTrigger>
              <ArrowUpDown />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">16 Transactions</h3>
              <Badge variant="outline">Sorted by date {sort}</Badge>
            </div>
            {/* {filteredTransactions.map((transaction) => (
              <>
              </>
            ))} */}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
