"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { CurrencyCard } from "./currency-card";

import { useHapticFeedback, useRate } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const CurrencyContainer: React.FC<Props> = ({ className }) => {
  const { rate, isLoading } = useRate("ton", "usd");
  const router = useRouter();
  const triggerFeedback = useHapticFeedback();

  const handleContainerClick = (path: string) => {
    triggerFeedback("light");
    router.push(path);
  };

  return (
    <div className={cn("cursor-pointer", className)}>
      <CurrencyCard
        iconPath="/ton-logo.svg"
        inconAlt="Toncoin logo"
        currencyName="Toncoin"
        currencyPrice={rate?.rates?.TON.prices.USD}
        currencyDiff={rate?.rates?.TON.diff_24h.USD}
        isLoading={rate ? false : isLoading}
        onClick={() => handleContainerClick("/rate/ton")}
      />
    </div>
  );
};
