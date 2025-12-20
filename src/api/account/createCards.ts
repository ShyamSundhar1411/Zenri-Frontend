import {
  CreateCreditCardRequest,
  CreateDebitCardRequest,
  CreditCard,
  DebitCard,
} from "@/di/account";
import { api } from "../client";
import { APIResponse } from "@/types/common";

export async function createCreditCard(
  data: CreateCreditCardRequest,
): Promise<CreditCard> {
  const res = await api.post<APIResponse<CreditCard>>("/api/v1/cards/credit", data);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to create credit card");
  }
  return res.data.data!;
}

export async function createDebitCard(
  data: CreateDebitCardRequest,
): Promise<DebitCard> {
  const res = await api.post<APIResponse<DebitCard>>("/api/v1/cards/debit", data);
  if (res.data.error) {
    throw new Error(res.data.error || "Failed to create debit card");
  }
  return res.data.data!;
}
