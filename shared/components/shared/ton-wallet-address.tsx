"use client";

import React from "react";

import { Badge, Button } from "../ui";

import { useClipboard } from "@/shared/hooks";
import { convertAddress, cutWalletAddress } from "@/shared/lib";

interface Props {
  walletAddress: string | undefined;
  chainId: string | undefined;
}

export const TonWalletAddress: React.FC<Props> = ({
  walletAddress,
  chainId,
}) => {
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
          className="text-warning-foreground/90 h-9 bg-warning/20 px-3 uppercase"
        >
          Testnet
        </Badge>
      )}
    </div>
  );
};
