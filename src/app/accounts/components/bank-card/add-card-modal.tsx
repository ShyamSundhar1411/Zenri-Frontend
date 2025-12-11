"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCardForm } from "./card-creation-form";
import { useState, useEffect } from "react";
import { MotionBankCard } from "./motion-bank-card-component";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { IconPlus } from "@tabler/icons-react";
import { formatCardNumber } from "@/lib/string-utils";
import { useGetCardNetworks } from "@/hooks/account/queries/useGetCardNetworks";
import { Loader } from "@/app/components/loader";
import { useGetMyBankAccounts } from "@/hooks/account/queries/useGetMyBankAccounts";

interface AddCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
}

export function AddCardModal({ open, onOpenChange }: AddCardModalProps) {
  const form = useCardForm();
  const cardType = form.watch("type");
  const cardNumber = form.watch("cardNumber");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: networks, isLoading: loadingNetworks } =
    useGetCardNetworks(open);

  const { data: bankAccounts, isLoading: loadingBankAccounts } =
    useGetMyBankAccounts(open);
  useEffect(() => {
    if (!cardNumber) return;

    const nn = cardNumber.replace(/\s/g, "");

    if (nn.startsWith("4")) form.setValue("cardNetwork", "visa");
    else if (/^5[1-5]/.test(nn)) form.setValue("cardNetwork", "mastercard");
    else if (/^3[47]/.test(nn)) form.setValue("cardNetwork", "amex");
  }, [cardNumber, form]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      console.log("CARD SUBMITTED:", data);
      // await apiCall();
      onOpenChange(false);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add New Card
          </DialogTitle>
        </DialogHeader>

        {loadingNetworks || loadingBankAccounts ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center mb-6">
              <MotionBankCard
                card={{
                  cardNumber: form.watch("cardNumber"),
                  cardHolderName: form.watch("cardHolderName"),
                  expiresAt: form.watch("expiresAt"),
                  cardNetwork: {
                    networkName: form.watch("cardNetwork"),
                  },
                }}
                inputMode={true}
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select card type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="debit">Debit Card</SelectItem>
                            <SelectItem value="credit">Credit Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            onChange={(e) => {
                              const formatted = formatCardNumber(
                                e.target.value,
                              );
                              field.onChange(formatted);
                            }}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNetwork"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Network</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select card network" />
                            </SelectTrigger>
                            <SelectContent>
                              {networks?.map((network) => (
                                <SelectItem
                                  key={network.id}
                                  value={network.networkName!}
                                >
                                  {network.networkName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiresAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="MM/YY" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {cardType === "debit" && (
                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select bank account" />
                            </SelectTrigger>
                            <SelectContent>
                              {bankAccounts?.map((bankAccount) => (
                                <SelectItem
                                  key={bankAccount.id}
                                  value={bankAccount.accountNumber!}
                                >
                                  {bankAccount.accountNumber!}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {cardType === "credit" && (
                  <>
                    <FormField
                      control={form.control}
                      name="issuer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuer</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Bank Name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="limit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Credit Limit</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                placeholder="1000"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="balance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Balance</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                placeholder="500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                {/* SUBMIT BUTTON */}
                <Button
                  type="submit"
                  className="w-full bg-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner />
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <IconPlus className="h-4 w-4" />
                      Add Card
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
