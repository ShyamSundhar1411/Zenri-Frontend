import { api } from "@/api/apiClient";
import { components } from "@/types/api";

type GetMyLedgersResponse = components["schemas"]["GetMyLedgersResponse"];
type Ledger = components["schemas"]["Ledger"];
export async function getMyLedgers(): Promise<Ledger[]> {
  const res = await api.get<GetMyLedgersResponse>("/api/v1/ledger/my-ledgers");
  console.log(res.data);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch ledgers");
  }
  return res.data.data!;
}
