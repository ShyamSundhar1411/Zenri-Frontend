"use client";

import { Loader } from "@/app/components/loader";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetLedgerById } from "@/hooks/ledger/queries/useGetLedgerById";
import { IconPlus } from "@tabler/icons-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTransactionPageData } from "@/hooks/transaction/queries/useTransactionPageData";
import { useGetLedgerDetail } from "@/hooks/ledger/queries/useGetLedgerDetail";
import { LedgerDetailMetrics } from "./components/ledger-detail-metrics";

export default function LedgerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const ledgerId = params?.id as string;

  const { ledger: ledger, transactions:transactions,isLoading, isError, error } =
    useGetLedgerDetail(ledgerId)

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  return (
    <div className="w-full h-full flex flex-col px-4 py-8">


      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader />
        </div>
      )}


      {!isLoading && ledger && (
        <div className="flex flex-col w-full max-w-7xl mx-auto">


          <div className="px-4 mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/ledgers">Ledgers</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {ledger.month} {ledger.year}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

  
          <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 px-4 py-6">

            
            <div className="flex items-center gap-3">
         
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/ledgers")}
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  {ledger.month} {ledger.year} Ledger
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {ledger.transactionMetadata?.transactions} transactions recorded
                </p>
              </div>
            </div>

            <Button className="flex items-center gap-2 py-5 px-6 bg-foreground text-background hover:bg-foreground/90 transition">
              <IconPlus className="w-4 h-4" />
              Add Transaction
            </Button>
          </div>


          <div className="px-4 mt-6">
            
              <LedgerDetailMetrics currentMonthLedger={ledger} isError={isError} isLoading={isLoading}/>
          </div>

        </div>
      )}
    </div>
  );
}