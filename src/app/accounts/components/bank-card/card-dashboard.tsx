"use client";
import { SearchBarComponent } from "@/app/components/search-bar";
import { Button } from "@/components/ui/button";
import { useGetMyCards } from "@/hooks/account/queries/useGetMyCards";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MotionBankCard } from "./motion-bank-card-component";
import { MotionBankCardSkeleton } from "./motion-bank-card-skeleton-component";
import { AddCardModal } from "./add-card-modal";
import { CardFormData } from "./card-creation-form";
import { CreateCardRequest, CreateCreditCardRequest, CreateDebitCardRequest } from "@/di/account";
import { useCreateCard } from "@/hooks/account/mutations/createCard";

export function CardDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: cards,
    isLoading: isCardsLoading,
    isError: isCardsError,
    error: cardsError,
  } = useGetMyCards();

  const [open, setOpen] = useState(false);

  const {
    mutateAsync: createCard,
    isPending: isCreateLoading,
    isError: isCreateError,
    error: createError,
  } = useCreateCard();
  useEffect(() => {
    if (isCardsError) {
      toast.error(cardsError?.message || "Something went wrong");
    }
  }, [isCardsError, cardsError]);

  return (
    <div className="flex flex-col items-start w-full py-6">
      <div className="flex flex-col w-full px-4">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <SearchBarComponent
            placeHolder="Search for a card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <Button
            className="flex items-center gap-2 rounded-lg bg-foreground"
            onClick={() => setOpen(true)}
          >
            <IconPlus size={20} />
            Add Card
          </Button>
        </div>
      </div>
      <div className="mt-6 w-full px-4">
        {isCardsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MotionBankCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <>
              {cards?.creditCards?.map((creditCard, index) => (
                <MotionBankCard
                  key={index}
                  card={creditCard}
                  inputMode={false}
                />
              ))}
              {cards?.debitCards?.map((debitCard, index) => (
                <MotionBankCard
                  key={index}
                  card={debitCard}
                  inputMode={false}
                />
              ))}
            </>
          </div>
        )}
      </div>
      <AddCardModal
        open={open}
        onOpenChange={setOpen}
        isLoading={isCreateLoading}
        isError={isCreateError}
        error={createError?.message || "Something went wrong"}
        onSubmit={async (data: CardFormData) => {

          if (data.type === "debit") {
            const debitCardCreateRequest: CreateCardRequest = {
              type: data.type,
              cardNumber: data.cardNumber.replace(/\s/g,""),
              bankAccount: data.bankAccount,
              cardHolderName: data.cardHolderName,
              cardNetwork: data.cardNetwork,
              expiresAt: data.expiresAt,
            };

            await createCard(debitCardCreateRequest);
          } else {
            const creditCardCreateRequest: CreateCardRequest = {
              type: data.type,
              cardNumber: data.cardNumber.replace(/\s/g,""),
              issuer: data.issuer,
              limit: data.limit,
              balance: data.balance,
              cardHolderName: data.cardHolderName,
              cardNetwork: data.cardNetwork,
              expiresAt: data.expiresAt,
            };
            await createCard(creditCardCreateRequest);
          }
          setOpen(false);
          toast.success("Card added successfully");
        }}
      />
    </div>
  );
}
