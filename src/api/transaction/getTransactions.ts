import { GetMyTransactionResponse, Transaction } from "@/di/transaction";
import { api } from "../client";
import type { components } from "@/types/api";

export async function getMyTransactions(): Promise<Transaction[]> {
  const res = await api.get<GetMyTransactionResponse>(
    "/api/v1/transactions/my-transactions",
  );
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch transactions");
  }
  return res.data.data!;
}
