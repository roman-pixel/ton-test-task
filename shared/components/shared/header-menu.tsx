"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { LogOut, Moon, Settings, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { Button } from "../ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const HeaderMenu: React.FC<Props> = ({ className }) => {
  const [tonConnectUI] = useTonConnectUI();
  const { setTheme } = useTheme();
  const wallet = useTonWallet();

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings
              className="opacity-90"
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="text-base">Настройки</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {wallet && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-base text-destructive"
                  onClick={() => tonConnectUI.disconnect()}
                >
                  <LogOut style={{ width: "16px", height: "16px" }} />
                  <span>Отвязать кошелек</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-base"
              onClick={() => setTheme("light")}
            >
              <Sun style={{ width: "16px", height: "16px" }} />
              <span>Светлая</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-base"
              onClick={() => setTheme("dark")}
            >
              <Moon style={{ width: "16px", height: "16px" }} />
              <span>Темная</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-base"
              onClick={() => setTheme("system")}
            >
              <SunMoon style={{ width: "16px", height: "16px" }} />
              <span>Системная</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
