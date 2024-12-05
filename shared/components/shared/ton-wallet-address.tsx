"use client";

import { Address } from "@ton/core";
import React from "react";

import { Button } from "../ui";

import { useClipboard } from "@/shared/hooks";
import { cutWalletAddress } from "@/shared/lib";

interface Props {
  walletAddress: string | undefined;
}

export const TonWalletAddress: React.FC<Props> = ({ walletAddress }) => {
  const { copyToClipboard } = useClipboard();
  const formatedAddress = Address.parse(walletAddress || "").toString({
    urlSafe: true,
    bounceable: true,
  });

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="secondary"
        className="rounded-full opacity-90"
        size="sm"
        onClick={() => copyToClipboard(formatedAddress)}
      >
        {cutWalletAddress(formatedAddress, 15)}
      </Button>
    </div>
  );
};
