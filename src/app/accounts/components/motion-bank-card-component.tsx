"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconBrandVisa,
  IconBrandMastercard,
  IconCreditCard,
} from "@tabler/icons-react";
import { components } from "@/types/api";

type DebitCard = components["schemas"]["DebitCard"];
type CreditCard = components["schemas"]["CreditCard"];

interface MotionBankCardProps {
  card: DebitCard | CreditCard;
  className?: string;
}

export function MotionBankCard({ card, className }: MotionBankCardProps) {
  const masked = card.cardNumber
    ? "•••• •••• •••• " + card.cardNumber.slice(-4)
    : "•••• •••• •••• ••••";

  const gradients = [
    "bg-gradient-to-br from-[#003087] via-[#00246b] to-[#001a52]",
    "bg-gradient-to-br from-[#1b4e9b] via-[#123b7a] to-[#0c2b5a]",
    "bg-gradient-to-br from-[#7a003c] via-[#5c002d] to-[#3e001f]",
    "bg-gradient-to-br from-[#8b0000] via-[#6b0000] to-[#4a0000]",
    "bg-gradient-to-br from-[#005b8f] via-[#004a73] to-[#003858]",
    "bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#000000]",
    "bg-gradient-to-br from-[#355c7d] via-[#27445d] to-[#1a2f41]",
    "bg-gradient-to-br from-[#0f1f45] via-[#152d63] to-[#0b1934]",
    "bg-gradient-to-br from-[#2e77bb] via-[#205f99] to-[#174b78]",
    "bg-gradient-to-br from-[#c2c2c2] via-[#a8a8a8] to-[#8c8c8c]",
    "bg-gradient-to-br from-[#c8102e] via-[#a10d25] to-[#7a091c]",
    "bg-gradient-to-br from-[#002a8f] via-[#001f6b] to-[#00154b]",
    "bg-gradient-to-br from-[#009f8b] via-[#008070] to-[#006256]",
    "bg-gradient-to-br from-[#d4a017] via-[#b78613] to-[#9b6f0f]",
  ];

  const selectedGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  const formattedExpiry = card.expiresAt
    ? (() => {
        const date = new Date(card.expiresAt);
        return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
          date.getFullYear(),
        ).slice(-2)}`;
      })()
    : "--/--";

  const network = (card as any).issuer || card.cardNetworkId || "CARD";

  const NetworkLogo = (() => {
    const id = network.toLowerCase();
    if (id.includes("visa"))
      return <IconBrandVisa className="h-9 w-9 text-white/90 mt-2" />;
    if (id.includes("master"))
      return <IconBrandMastercard className="h-9 w-9 text-white/90 mt-2" />;
    return <IconCreditCard className="h-9 w-9 text-white/70 mt-2" />;
  })();

  const status = card.status ?? "ACTIVE";

  const statusClass =
    status === "ACTIVE"
      ? "bg-green-400/15 text-green-200 border border-green-400/25"
      : status === "BLOCKED"
        ? "bg-red-400/15 text-red-200 border border-red-400/25"
        : "bg-yellow-400/15 text-yellow-200 border border-yellow-400/25";

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 6, rotateY: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      className={cn(
        "relative rounded-3xl text-white shadow-2xl overflow-hidden",
        "w-full max-w-[420px]",
        "aspect-[1.586/1]",
        "p-7",
        selectedGradient,
        "border border-white/10 backdrop-blur-2xl",
        "flex flex-col justify-between",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.03)_40%,rgba(255,255,255,0)_80%)] opacity-60 pointer-events-none" />

      <div
        className={cn(
          "absolute top-4 right-4 px-2.5 py-1 text-[0.7rem] rounded-md",
          "backdrop-blur-md font-medium tracking-wide",
          statusClass,
        )}
      >
        {status}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold tracking-wide">
          {network.toUpperCase()}
        </span>
        {NetworkLogo}
      </div>

      <div className="mt-6 text-2xl tracking-widest font-semibold font-mono select-none">
        {masked}
      </div>

      <div className="flex justify-between items-end mt-6 pb-1">
        <div>
          <p className="text-xs opacity-60">Card Holder</p>
          <p className="text-base font-medium">Shyam Sundhar</p>
        </div>

        <div className="text-right">
          <p className="text-xs opacity-60">Expires</p>
          <p className="text-base font-medium">{formattedExpiry}</p>
        </div>
      </div>
    </motion.div>
  );
}
