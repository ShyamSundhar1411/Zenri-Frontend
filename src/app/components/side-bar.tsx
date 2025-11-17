"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowsExchange,
  IconCreditCard,
  IconLayoutDashboard,
  IconListDetails,
  IconLogout,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

export function SideBarComponent() {
  const user = useAuthStore((state) => state.user);

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Subscriptions",
      href: "/subscriptions",
      icon: (
        <IconListDetails className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: (
        <IconArrowsExchange className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Accounts",
      href: "/accounts",
      icon: (
        <IconCreditCard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => {
        useAuthStore.getState().logout();
      },
      icon: (
        <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div className={cn("mx-auto flex  rounded-md border", "h-screen")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user ? user.userName : "Anonymous"}`,
                href: "#",
                icon: (
                  <IconUser className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <a href="#" className="relative z-20 flex items-center space-x-3 p-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black dark:bg-white">
        <IconWallet className="h-4 w-4 text-white dark:text-black" />
      </div>

      <motion.span
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold tracking-wide text-black dark:text-white"
      >
        Zenri
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <div className="w-full flex items-center justify-center py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black dark:bg-white">
        <IconWallet className="h-4 w-4 text-white dark:text-black" />
      </div>
    </div>
  );
};
