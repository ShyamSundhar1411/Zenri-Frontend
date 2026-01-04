"use client";

import { useGetLedgerById } from "@/hooks/ledger/queries/useGetLedgerById";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LedgerDetailPage() {
  const params = useParams();
  const ledgerId = params.id;
  const {data:ledger, isLoading, isError, error } = useGetLedgerById(ledgerId as string)
  useEffect(()=>{
    if(isError){
      toast.error(error?.message || "Something went wrong")
    }
  },[isError, error])
  console.log("Ledger", ledger)
  return (
    <div>
      <h1>Ledger Detail Page</h1>
      <p>ID: {params.id}</p>
    </div>
  );
}
