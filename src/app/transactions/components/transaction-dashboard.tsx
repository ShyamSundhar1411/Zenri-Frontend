"use client"
import { Car, Coffee, Home, LucideIcon, ShoppingBag, Smartphone, TrendingUp, TrendingUpDown } from "lucide-react";
import { TransactionDashboardMetrics } from "./transaction-dashboard-metrics";
import { TransactionsList } from "./transactions-list";

export function TransactionDashboard(){

    return (
        <div className="flex flex-col w-full p-2 space-y-6">
            <TransactionDashboardMetrics />
            <TransactionsList />
        </div>
    )
}