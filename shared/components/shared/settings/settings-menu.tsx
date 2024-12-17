"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";

import { Card } from "../card";
import { ThemeSettings, themeLabels } from "./theme-settings";
import { WalletDisconnect } from "./wallet-disconnect";

import { cn } from "@/shared/lib";

interface Props {
  className?: string;
}

export const SettingsMenu: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { theme } = useTheme();

  const handleClick = () => {
    router.replace("/");
    tonConnectUI.disconnect();
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <ThemeSettings>
        <Card className="flex items-center justify-between py-3">
          <span>Тема</span>
          <span className="text-primary/80">
            {themeLabels[theme as string] || theme}
          </span>
        </Card>
      </ThemeSettings>

      {wallet && (
        <WalletDisconnect onClick={handleClick}>
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
  );
};
