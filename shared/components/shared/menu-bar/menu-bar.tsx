"use client";

import { useTonWallet } from "@tonconnect/ui-react";
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

  const { Wallet, Clock, Settings } = Icons;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full bg-background pb-7 pt-4 text-foreground",
        {
          "border-t": pathName === "/transactions",
        },
      )}
    >
      <Container className="flex items-center justify-evenly gap-10">
        <MenuButton
          label="Кошелёк"
          className={cn("w-14 text-[#858F99]", {
            "text-primary": pathName === "/",
          })}
          onClick={() => router.push("/")}
        >
          <Wallet
            width="25px"
            height="22px"
            className={cn("fill-[#858F99]", {
              "fill-primary": pathName === "/",
            })}
          />
        </MenuButton>
        {wallet && (
          <MenuButton
            label="История"
            className={cn("w-14 text-[#858F99]", {
              "text-primary": pathName === "/transactions",
            })}
            onClick={() => router.push("/transactions")}
          >
            <Clock
              width="24px"
              height="24px"
              className={cn("fill-[#858F99]", {
                "fill-primary": pathName === "/transactions",
              })}
            />
          </MenuButton>
        )}
        <MenuButton
          label="Настройки"
          className={cn("w-14 text-[#858F99]", {
            "text-primary": pathName === "/settings",
          })}
          onClick={() => router.push("/settings")}
        >
          <Settings
            width="26px"
            height="26px"
            className={cn("fill-[#858F99]", {
              "fill-primary": pathName === "/settings",
            })}
          />
        </MenuButton>
      </Container>
    </div>
  );
};
