"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { Bolt, Clock, CreditCard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { Container } from "./container";
import { MenuButton } from "./menu-button";
import { SettingsMenu } from "./settings";

import { cn } from "@/shared/lib";

export const MenuBar: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const wallet = useTonWallet();

  if (!wallet) return;

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
          className={cn("w-14", {
            "text-primary": pathName === "/",
          })}
          onClick={() => router.push("/")}
        >
          <CreditCard style={{ width: "26px", height: "26px" }} />
        </MenuButton>
        <MenuButton
          label="История"
          className={cn("w-14", {
            "text-primary": pathName === "/transactions",
          })}
          onClick={() => router.push("/transactions")}
        >
          <Clock style={{ width: "26px", height: "26px" }} />
        </MenuButton>
        <SettingsMenu>
          <MenuButton label="Настройки" className="w-14">
            <Bolt style={{ width: "26px", height: "26px" }} />
          </MenuButton>
        </SettingsMenu>
      </Container>
    </div>
  );
};
