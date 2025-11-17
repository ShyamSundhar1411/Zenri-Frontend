import { Button } from "@/components/ui/button";
import { DashboardMetrics } from "./dashboard-metrics";
import { IconPlus } from "@tabler/icons-react";

export default function DashboardComponent() {
    return (
        <div className="flex flex-col w-full px-4 py-6">
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <Button className="flex items-center gap-2 py-4 transition">
                    <IconPlus className="w-4 h-4" />
                    New Ledger
                </Button>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
                Manage your expenses and income
            </p>
            <DashboardMetrics />
        </div>
    )
}