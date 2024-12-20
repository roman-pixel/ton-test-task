"use client";

import { RotateCw } from "lucide-react";
import React, { useEffect } from "react";

import { Button, Skeleton } from "../ui";

import { useHapticFeedback } from "@/shared/hooks";
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
  const triggerFeedback = useHapticFeedback();

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

  const handleClick = () => {
    triggerFeedback("medium");
    fetchBalance(address || "");
  };

  if (error || data?.code || !data?.result) {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="p-10"
        onClick={handleClick}
      >
        <RotateCw strokeWidth={2} style={{ width: "35px", height: "35px" }} />
      </Button>
    );
  }

  const { wholePart, decimalPart } = convertTonsValue(data.result);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
    >
      {loading && !data.result ? (
        <>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-16 w-56" />
        </>
      ) : (
        <>
          <div className="flex items-end font-bold">
            <span className="text-6xl">{wholePart || "0"}</span>
            <span className="text-5xl">,{decimalPart || "00"}</span>
            <span className="pl-2 text-2xl uppercase opacity-60">ton</span>
          </div>
        </>
      )}
    </div>
  );
};
