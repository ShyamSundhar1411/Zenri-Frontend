import { APIResponse } from "@/types/common";
import { api } from "../apiClient";
import type { components } from "@/types/api";

type Subscription = components["schemas"]["Subscription"];
type Subscriptions = components["schemas"]["Subscriptions"];

export async function getMySubscriptions(): Promise<Subscriptions> {
  const res = await api.get<APIResponse<Subscriptions>>(
    "/api/v1/subscriptions",
  );
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to fetch subscriptions");
  }
  return res.data.data!;
}
