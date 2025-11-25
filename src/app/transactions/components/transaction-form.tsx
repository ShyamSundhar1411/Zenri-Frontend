"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const transactionSchema = z.object({
  amount: z.coerce.number<number>().min(0, "Amount must be positive"),
  currencyCode: z.string(),
  transactionType: z.enum(["DEBIT", "CREDIT"]),
  paymentMethodId: z.string().nonempty("Payment method is required"),
  categoryId: z.string().nonempty("Category is required"),
  description: z.string().min(1, "Description is required"),
  transactedOn: z.string().nonempty("Transaction date is required"),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function useTransactionForm() {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      currencyCode: "INR",
      transactionType: "DEBIT",
      paymentMethodId: "",
      categoryId: "",
      description: "",
      transactedOn: "",
    },
  });

  return form;
}
