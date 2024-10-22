"use client";

import { TonConnectUI } from "@tonconnect/ui-react";
import { Clipboard, EllipsisVertical, LogOut } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from "../ui";

interface Props {
  walletAddress: string;
  tonConnectUI: TonConnectUI;
}

export const TonWalletAddress: React.FC<Props> = ({
  walletAddress,
  tonConnectUI,
}) => {
  const [inputValue, setInputValue] = useState(walletAddress || "");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        toast.success("Скопировано в буфер обмена");
        setIsCopied(true);
      })
      .catch((err) => {
        toast.error("Ошибка при копировании: ", err);
        console.error(err);
      });
  };

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
          <DropdownMenuItem onClick={handleCopy}>
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
