"use client";

import React, { useEffect } from "react";

import { Skeleton } from "../ui";

import { convertTonsValue } from "@/shared/lib/convert-tons-value";
import { cn } from "@/shared/lib/utils";
import { useBalanceStore } from "@/shared/store/balance";

interface Props {
  address: string | undefined;
  className?: string;
}

export const Balance: React.FC<Props> = ({ address, className }) => {
  const [data, error, loading, fetchBalance] = useBalanceStore((state) => [
    state.data,
    state.error,
    state.loading,
    state.fetchBalance,
  ]);

  useEffect(() => {
    if (address) fetchBalance(address);
  }, [address, fetchBalance]);

  if (error || data?.error || data?.code) {
    return null;
  }

  const { wholePart, decimalPart } = convertTonsValue(data.balance);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      {loading ? (
        <>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-16 w-56" />
        </>
      ) : (
        <>
          <p className="text-xl">Баланс</p>
          <div className="flex items-end font-bold">
            <span className="text-6xl">{wholePart}</span>
            <span className="text-5xl">,{decimalPart}</span>
            <span className="pl-2 text-2xl uppercase opacity-60">ton</span>
          </div>
        </>
      )}
    </div>
  );
};
