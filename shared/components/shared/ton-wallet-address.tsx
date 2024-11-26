"use client";

import { Address } from "@ton/core";
import React from "react";

import { Button } from "../ui";

import { useClipboard } from "@/shared/hooks";

interface Props {
  walletAddress: string | undefined;
}

export const TonWalletAddress: React.FC<Props> = ({ walletAddress }) => {
  const { copyToClipboard } = useClipboard();
  const formatedAddress = Address.parse(walletAddress || "").toString({
    urlSafe: true,
    bounceable: true,
  });

  const getEllipsisText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, maxLength / 2);
    const end = text.slice(-maxLength / 2);
    return `${start}...${end}`;
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="secondary"
        className="rounded-full opacity-90"
        size="sm"
        onClick={() => copyToClipboard(formatedAddress)}
      >
        {getEllipsisText(formatedAddress, 15)}
      </Button>
    </div>
  );
};
