"use client";

import { TonConnectUI } from "@tonconnect/ui-react";
import { Clipboard, EllipsisVertical, LogOut } from "lucide-react";
import React, { useState } from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from "../ui";

import { useClipboard } from "@/shared/hooks/use-clipboard";

interface Props {
  walletAddress: string | undefined;
  tonConnectUI: TonConnectUI;
}

export const TonWalletAddress: React.FC<Props> = ({
  walletAddress,
  tonConnectUI,
}) => {
  const [inputValue, setInputValue] = useState(walletAddress || "");
  const { copyToClipboard } = useClipboard();

  return (
    <div className="flex w-9/12 items-center">
      <Input
        className="rounded-r-none"
        readOnly
        value={walletAddress}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-l-none">
            <EllipsisVertical className="opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => copyToClipboard(inputValue)}>
            <Clipboard />
            <span className="ml-2">Копировать</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => tonConnectUI.disconnect()}
          >
            <LogOut />
            <span className="ml-2">Отвязать кошелек</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
