"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryBreakdown } from "@/di/transaction";
import { PieChart } from "lucide-react";

interface CategoryBreakdownProps {
    categoryBreakdown: CategoryBreakdown[];
}

const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-cyan-500",
];

export function CategoryBreakdownComponent({
    categoryBreakdown,
}: CategoryBreakdownProps) {
    return (
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-accent-foreground/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                    <PieChart className="w-6 h-6 text-primary" />
                    Category Breakdown
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <ScrollArea className="h-[calc(100vh-400px)]">
                    <div className="space-y-4">
                        {categoryBreakdown.map((category, index) => {
                            const color = colors[index % colors.length];

                            return (
                                <div key={category.categoryName} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${color}`} />
                                            <span className="font-medium text-xs">
                                                {category.categoryName}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">
                                                {category.currencyCode}{" "}
                                                {category.totalAmount.toLocaleString()}
                                            </span>

                                            <Badge variant="secondary" className="text-xs">
                                                {category.percentage}%
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${color}`}
                                            style={{ width: `${category.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}