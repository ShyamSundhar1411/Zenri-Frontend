import { APIResponse } from "@/types/common";
import { api } from "../apiClient";
import type { components } from "@/types/api";

type Card = components["schemas"]["Card"];

export async function getMyCards(): Promise<Card> {
  const res = await api.get<APIResponse<Card>>("/api/v1/cards/my-cards");
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch cards");
  }
  return res.data.data!;
}
