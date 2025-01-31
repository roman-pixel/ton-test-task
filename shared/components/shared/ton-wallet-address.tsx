"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import React from "react";

import { Badge, Button } from "../ui";

import { useClipboard } from "@/shared/hooks";
import { convertAddress, cutWalletAddress } from "@/shared/lib";

export const TonWalletAddress: React.FC = () => {
  const wallet = useTonWallet();
  const walletAddress = wallet?.account.address;
  const chainId = wallet?.account.chain;

  const { copyToClipboard } = useClipboard();
  const formatedAddress = convertAddress(walletAddress || "");

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="secondary"
        className="rounded-full opacity-90"
        size="sm"
        onClick={() => copyToClipboard(formatedAddress)}
      >
        {cutWalletAddress(formatedAddress, 15)}
      </Button>
      {chainId === "-3" && (
        <Badge
          variant="secondary"
          className="h-9 bg-attention/20 px-3 uppercase text-attention-foreground/90"
        >
          Testnet
        </Badge>
      )}
    </div>
  );
};
