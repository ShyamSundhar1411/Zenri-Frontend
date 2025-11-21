import {
  IconBrandVisa,
  IconBrandMastercard,
  IconCreditCard,
  ReactNode,
} from "@tabler/icons-react";

import { CreditCard as LucideCard } from "lucide-react";

import {
  FaCcAmex,
  FaCcDiscover,
  FaCcDinersClub,
  FaCcJcb,
} from "react-icons/fa";

export const getNetworkLogo = (network: string): ReactNode => {
  const n = network.toLowerCase();

  if (n.includes("visa")) return <IconBrandVisa className="h-9 w-9 mt-2" />;
  if (n.includes("master"))
    return <IconBrandMastercard className="h-9 w-9 mt-2" />;
  if (n.includes("amex") || n.includes("american express"))
    return <FaCcAmex className="h-9 w-9 mt-2" />;
  if (n.includes("discover")) return <FaCcDiscover className="h-9 w-9 mt-2" />;
  if (n.includes("diners")) return <FaCcDinersClub className="h-9 w-9 mt-2" />;
  if (n.includes("jcb")) return <FaCcJcb className="h-9 w-9 mt-2" />;

  return <LucideCard className="h-9 w-9 mt-2" />;
};
