"use client";

import { JSX, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { components } from "@/types/api";


type Transaction = components["schemas"]["Transaction"]

export function TransactionsList() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sort, setSort] = useState("newest");
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchBarComponent
              placeHolder="Search transactions"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="pl-9"
            />
          </div>
          <Select onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

        
          <Select onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <ArrowUpDown className="w-4 h-4 mr-2" />
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
          <div className="grid gap-4">
            {/* {filteredTransactions.map((transaction) => (
              <>
              </>
            ))} */}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )

}
