"use client";

import { RotateCw } from "lucide-react";
import React, { useEffect } from "react";

import { Button, Skeleton } from "../ui";

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
    if (address) {
      fetchBalance(address);

      const interval = setInterval(() => {
        fetchBalance(address);
      }, 30000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [address, fetchBalance]);

  if (error || data?.code || !data?.balance) {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="p-10"
        onClick={() => fetchBalance(address || "")}
      >
        <RotateCw strokeWidth={2} style={{ width: "35px", height: "35px" }} />
      </Button>
    );
  }

  const { wholePart, decimalPart } = convertTonsValue(data.balance);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
    >
      {loading && !data.balance ? (
        <>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-16 w-56" />
        </>
      ) : (
        <>
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
