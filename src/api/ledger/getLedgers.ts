import { api } from "@/api/apiClient";
import { GetMyLedgersResponse, Ledger } from "@/di/ledger";
import { components } from "@/types/api";

export async function getMyLedgers(): Promise<Ledger[]> {
  const res = await api.get<GetMyLedgersResponse>("/api/v1/ledger/my-ledgers");
  console.log(res.data);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch ledgers");
  }
  return res.data.data!;
}
