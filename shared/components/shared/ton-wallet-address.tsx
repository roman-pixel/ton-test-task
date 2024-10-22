"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button, Input } from "../ui";

interface Props {
  walletAddress: string;
}

export const TonWalletAddress: React.FC<Props> = ({ walletAddress }) => {
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

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="flex w-9/12 items-center">
      <Input
        className="rounded-r-none"
        readOnly
        value={walletAddress}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none"
        onClick={handleCopy}
      >
        {isCopied ? (
          <ClipboardCheck className="opacity-60" />
        ) : (
          <Clipboard className="opacity-60" />
        )}
      </Button>
    </div>
  );
};
