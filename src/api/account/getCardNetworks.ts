import { APIResponse } from "@/types/common";
import { api } from "../client";
import { CardNetwork } from "@/di/account";

export async function getCardNetworks(): Promise<CardNetwork[]> {
  const res = await api.get<APIResponse<CardNetwork[]>>(
    "/api/v1/cards/networks",
  );
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch card networks");
  }
  return res.data.data!;
}
