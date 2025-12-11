import { APIResponse } from "@/types/common";
import { api } from "../client";
import type { components } from "@/types/api";
import { PaymentMethod } from "@/di/account";

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
