"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { Skeleton } from "../ui";

import { convertTonsValue } from "@/shared/lib/convert-tons-value";
import { cn } from "@/shared/lib/utils";
import { useBalanceStore } from "@/shared/store/balance";

interface Props {
  address: string;
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
  }, [address]);

  if (error || data.error) {
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
