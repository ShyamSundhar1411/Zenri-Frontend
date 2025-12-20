"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { CardFormData, useCardForm } from "./card-creation-form";
import { MotionBankCard } from "./motion-bank-card-component";
import { expiryToTimeStamp, formatCardNumber } from "@/lib/string-utils";
import { useGetCardNetworks } from "@/hooks/account/queries/useGetCardNetworks";
import { useGetMyBankAccounts } from "@/hooks/account/queries/useGetMyBankAccounts";
import { Loader } from "@/app/components/loader";
import { useEffect } from "react";
import { toast } from "sonner";

interface AddCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CardFormData) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

export function AddCardModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  isError,
  error,
}: AddCardModalProps) {
  const form = useCardForm();
  const cardType = form.watch("type");
  const cardNumber = form.watch("cardNumber");

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

  const handleSubmit = async (data: CardFormData) => {
    const expiresAtString = expiryToTimeStamp(data.expiresAt, "string") as string;
    if (!expiresAtString) {
      toast.error("Invalid expiry date");
      return;
    }
    const payload = {
      ...data,
      expiresAt: expiresAtString,
    };

    await onSubmit(payload);
    form.reset();
  };
  useEffect(() => {
    if (isError && error) {
      toast.error(error);
    }
  }, [isError, error]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => !isLoading && onOpenChange(v)}
    >
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
            <div className="flex justify-center mb-6">
              <MotionBankCard
                inputMode
                card={{
                  cardNumber: form.watch("cardNumber"),
                  cardHolderName: form.watch("cardHolderName"),
                  expiresAt: expiryToTimeStamp(form.watch("expiresAt"), "string") as string,
                  cardNetwork: { networkName: form.watch("cardNetwork") },
                }}
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                {/* Card Type */}
                <FormField
                  control={form.control}
                  name="type"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
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


                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            maxLength={19}
                            placeholder="1234 5678 9012 3456"
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                formatCardNumber(e.target.value),
                              )
                            }
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
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Network" />
                            </SelectTrigger>
                            <SelectContent>
                              {networks?.map((n) => (
                                <SelectItem key={n.id} value={n.networkName!}>
                                  {n.networkName}
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
                      <FormItem className="w-full">
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
                          <Input
                            {...field}
                            placeholder="MM/YY"
                            maxLength={5}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "");

                              if (v.length > 2) {
                                v = v.slice(0, 2) + "/" + v.slice(2, 4);
                              }

                              const [mm] = v.split("/");
                              if (mm && Number(mm) > 12) {
                                v = "12" + (v.slice(2) ? "/" + v.slice(3) : "");
                              }

                              field.onChange(v);
                            }}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Debit-only */}
                {cardType === "debit" && (
                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {bankAccounts?.map((b) => (
                                <SelectItem
                                  key={b.id}
                                  value={b.accountNumber!}
                                >
                                  {b.accountNumber}
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

                {/* Credit-only */}
                {cardType === "credit" && (
                  <>

                    <FormField
                      control={form.control}
                      name="issuer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuer</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <FormLabel>Limit</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
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
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}



                <Button
                  type="submit"
                  className="w-full bg-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Spinner />
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
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
