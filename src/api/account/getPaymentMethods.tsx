import { APIResponse } from "@/types/common";
import { api } from "../apiClient";
import type { components } from "@/types/api";

type PaymentMethod = components["schemas"]["PaymentMethod"];

export async function getMyPaymentMethods(): Promise<PaymentMethod[]> {
  const res = await api.get<APIResponse<PaymentMethod[]>>(
    "/api/v1/payment-methods/",
  );

  if (res.data.error) {
    console.log(res);
    throw new Error(res.data.error || "Failed to fetch payment methods");
  }
  return res.data.data!;
}
