import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  Transaction,
} from "@/di/transaction";
import { api } from "../client";
import type { components } from "@/types/api";

export async function createTransaction(
  data: CreateTransactionRequest,
): Promise<Transaction> {
  const res = await api.post<CreateTransactionResponse>(
    "/api/v1/transactions/",
    data,
  );
  console.log(res);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to create transaction");
  }
  return res.data.data!;
}
