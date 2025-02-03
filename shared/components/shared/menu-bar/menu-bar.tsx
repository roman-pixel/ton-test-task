"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { Container } from "../container";
import { Icons } from "./icons";
import { MenuButton } from "./menu-button";

import { useHapticFeedback } from "@/shared/hooks";
import { cn } from "@/shared/lib";

export const MenuBar: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const wallet = useTonWallet();
  const locale = useLocale();
  const triggerFeedback = useHapticFeedback();

  const t = useTranslations("MenuBar");

  const { Wallet, Clock, Settings } = Icons;

  const handleClick = (path: string) => {
    triggerFeedback("light");
    router.push(`/${locale}/${path}`);
  };

  const bottomInset = getComputedStyle(document.documentElement)
    .getPropertyValue("--tg-safe-area-inset-bottom")
    .trim();

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full bg-background/60 py-4 backdrop-blur-2xl",
        {
          "border-t": pathName === "/transactions",
          "pb-[var(--tg-safe-area-inset-bottom)]": bottomInset,
        },
      )}
    >
      <Container className="flex items-center justify-evenly gap-10">
        <MenuButton
          label={t("wallet.title")}
          className={cn("w-14 text-[#858F99]", {
            "text-primary":
              pathName === `/${locale}` ||
              pathName.startsWith(`/${locale}/rate/`),
          })}
          onClick={() => handleClick("")}
        >
          <Wallet
            width="25px"
            height="22px"
            className={cn("fill-[#858F99]", {
              "fill-primary":
                pathName === `/${locale}` ||
                pathName.startsWith(`/${locale}/rate/`),
            })}
          />
        </MenuButton>
        {wallet && (
          <MenuButton
            label={t("transactions.title")}
            className={cn("w-14 text-[#858F99]", {
              "text-primary": pathName === `/${locale}/transactions`,
            })}
            onClick={() => handleClick("transactions")}
          >
            <Clock
              width="24px"
              height="24px"
              className={cn("fill-[#858F99]", {
                "fill-primary": pathName === `/${locale}/transactions`,
              })}
            />
          </MenuButton>
        )}
        <MenuButton
          label={t("settings.title")}
          className={cn("w-14 text-[#858F99]", {
            "text-primary": pathName === `/${locale}/settings`,
          })}
          onClick={() => handleClick("settings")}
        >
          <Settings
            width="26px"
            height="26px"
            className={cn("fill-[#858F99]", {
              "fill-primary": pathName === `/${locale}/settings`,
            })}
          />
        </MenuButton>
      </Container>
    </div>
  );
};
