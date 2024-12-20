"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { Container } from "../container";
import { Icons } from "./icons";
import { MenuButton } from "./menu-button";

import { cn } from "@/shared/lib";

export const MenuBar: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const wallet = useTonWallet();
  const locale = useLocale();

  const t = useTranslations("MenuBar");

  const { Wallet, Clock, Settings } = Icons;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full bg-background/60 pb-6 pt-4 backdrop-blur-2xl",
        {
          "border-t": pathName === "/transactions",
        },
      )}
    >
      <Container className="flex items-center justify-evenly gap-10">
        <MenuButton
          label={t("wallet.title")}
          className={cn("w-14 text-[#858F99]", {
            "text-primary": pathName === `/${locale}`,
          })}
          onClick={() => router.push(`/${locale}`)}
        >
          <Wallet
            width="25px"
            height="22px"
            className={cn("fill-[#858F99]", {
              "fill-primary": pathName === `/${locale}`,
            })}
          />
        </MenuButton>
        {wallet && (
          <MenuButton
            label={t("transactions.title")}
            className={cn("w-14 text-[#858F99]", {
              "text-primary": pathName === `/${locale}/transactions`,
            })}
            onClick={() => router.push(`/${locale}/transactions`)}
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
          onClick={() => router.push(`/${locale}/settings`)}
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
