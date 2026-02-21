import { Transaction, TransactionDetail } from "@/di/transaction";
import { api } from "../client";
import { APIResponse } from "@/types/common";


export async function getTransactionsByLedgerId(ledgerId: string): Promise<TransactionDetail> {
  const res = await api.get<APIResponse<TransactionDetail>>(`/api/v1/transactions/${ledgerId}`);
  console.log("Result",res)
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch transactions");
  }
  return res.data.data!;
  
}