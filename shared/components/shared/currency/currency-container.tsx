"use client";

import React from "react";

import { CurrencyCard } from "./currency-card";

import { useRate } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const CurrencyContainer: React.FC<Props> = ({ className }) => {
  const { rate, isLoading } = useRate("ton", "usd");

  return (
    <div className={cn(className)}>
      <CurrencyCard
        iconPath="/ton-logo.svg"
        inconAlt="Toncoin logo"
        currencyName="Toncoin"
        currencyPrice={rate?.rates?.TON.prices.USD}
        currencyDiff={rate?.rates?.TON.diff_24h.USD}
        isLoading={rate ? false : isLoading}
      />
    </div>
  );
};
