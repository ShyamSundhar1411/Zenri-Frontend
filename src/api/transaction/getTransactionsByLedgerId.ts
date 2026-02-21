import { Transaction } from "@/di/transaction";
import { api } from "../client";
import { APIResponse } from "@/types/common";


export async function getTransactionsByLedgerId(ledgerId: string): Promise<Transaction[]> {
  const res = await api.get<APIResponse<Transaction[]>>(`/api/v1/transactions/${ledgerId}`);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch transactions");
  }
  return res.data.data!;
  
}