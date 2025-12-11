import type { components } from "@/types/api";

export type GetMyBankAccountsResponse =
  components["schemas"]["GetMyBankAccountsResponse"];
export type BankAccount = components["schemas"]["BankAccount"];
export type Card = components["schemas"]["Card"];
export type PaymentMethod = components["schemas"]["PaymentMethod"];
export type DebitCard = components["schemas"]["DebitCard"];
export type CreditCard = components["schemas"]["CreditCard"];
export type CardNetwork = components["schemas"]["CardNetwork"];
export type CreateCreditCardRequest =
  components["schemas"]["CreateCreditCardRequest"];
export type CreateDebitCardRequest =
  components["schemas"]["CreateDebitCardRequest"];
export type CreateCardRequest =
  | CreateCreditCardRequest
  | CreateDebitCardRequest;
