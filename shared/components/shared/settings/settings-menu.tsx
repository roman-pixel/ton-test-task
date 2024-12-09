"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { LogOut, X } from "lucide-react";
import { useTheme } from "next-themes";
import React, { PropsWithChildren } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Card } from "../card";
import { ThemeSettings, themeLabels } from "./theme-settings";
import { WalletDisconnect } from "./wallet-disconnect";

export const SettingsMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { theme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-[80vw] max-w-[500px] flex-col gap-4">
        <SheetClose className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 text-slate-200/90">
          <X style={{ width: "36px", height: "36px" }} strokeWidth={2.3} />
        </SheetClose>
        <SheetHeader>
          <SheetTitle>Настройки</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6">
          <ThemeSettings>
            <Card className="flex items-center justify-between py-3">
              <span>Тема</span>
              <span className="text-primary/80">
                {themeLabels[theme as string] || theme}
              </span>
            </Card>
          </ThemeSettings>

          {wallet && (
            <WalletDisconnect onClick={() => tonConnectUI.disconnect()}>
              <Card className="flex w-full items-center justify-between py-3 text-base text-destructive dark:text-red-500">
                <span>Выйти</span>
                <LogOut
                  style={{ width: "18px", height: "18px" }}
                  strokeWidth={2.3}
                />
              </Card>
            </WalletDisconnect>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
