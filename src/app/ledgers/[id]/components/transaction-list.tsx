"use client";

import { FilterPopover } from "@/app/components/filter-popover";
import { SearchBarComponent } from "@/app/components/search-bar";
import { TransactionItem } from "@/app/transactions/components/transaction-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transaction } from "@/di/transaction";
import { useGetMyCategories } from "@/hooks/category/queries/useGetMyCategories";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";


interface TransactionListProps {
    transactions: Transaction[]
}
export function TransactionList({ transactions }: TransactionListProps) {
    const [search, setSearch] = useState<string>("");
    const [filterCategories, setFilterCategories] = useState<string[]>([]);
    const [sort, setSort] = useState("asc");
    const { data: categories } = useGetMyCategories();
    const filteredTransactions = useMemo(() => {
        if (!transactions) return [];
        let list = [...transactions];
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
        if (sort === "asc") {
            list.sort(
                (a, b) =>
                    new Date(a.transactedOn!).getTime() -
                    new Date(b.transactedOn!).getTime(),
            );
        } else {
            list.sort(
                (a, b) =>
                    new Date(b.transactedOn!).getTime() -
                    new Date(a.transactedOn!).getTime(),
            );
        }
        return list;

    }, [search, filterCategories, transactions,sort])
    return (
        <div className="flex flex-col shadow-sm">
            <div className="flex items-center justify-between gap-4 px-2 py-4">
                <SearchBarComponent
                    placeHolder="Search transactions"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className="w-full sm:flex-1 pl-9"
                />
                <FilterPopover
                    options={categories?.map((c) => c.categoryName) || []}
                    selectedOptions={filterCategories}
                    setSelectedOptions={setFilterCategories}
                    title="Categories"
                    buttonLabel="Categories"
                />
            </div>

            <div className="space-y-2 pb-4 pr-8 pl-8">


                {transactions && (
                    <>
                        <div className="flex items-center justify-between pb-2 pl-2 pr-2">
                            <h3 className="text-lg font-semibold">
                                Transactions {filteredTransactions.length}
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setSort((prev) => (prev === "asc" ? "desc" : "asc"))
                                }
                                className="flex items-center gap-2"
                            >
                                {sort === "asc" ? (
                                    <ArrowUpDown className="w-4 h-4" />
                                ) : (
                                    <ArrowDownUp className="w-4 h-4" />
                                )}

                                
                            </Button>
                        </div>
                        <ScrollArea className="h-[calc(100vh-400px)]">
                            <div className="space-y-2">
                                {filteredTransactions.map((transaction) => (
                                    <TransactionItem
                                        key={transaction.id}
                                        transaction={transaction}
                                    />
                                ))}
                            </div>

                        </ScrollArea>

                    </>
                )}
            </div>

        </div>
    )
}