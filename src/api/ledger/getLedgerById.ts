import { api } from "../client";
import type { Ledger } from "@/di/ledger";


export async function getLedgerById(id: string): Promise<Ledger> {
  const res = await api.get(`/api/v1/ledger/${id}`);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch ledger");
  }
  return res.data.data!;
}