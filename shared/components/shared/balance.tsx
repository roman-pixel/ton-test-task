"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { RotateCw } from "lucide-react";
import React, { useEffect } from "react";

import { Badge, Button, Skeleton } from "../ui";
import { Asterisk } from "./asterisk";

import { useHapticFeedback, useLocalStorage } from "@/shared/hooks";
import { convertTonsValue } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { useBalanceStore } from "@/shared/store/balance";

interface Props {
  className?: string;
}

export const Balance: React.FC<Props> = ({ className }) => {
  const wallet = useTonWallet();
  const address = wallet?.account?.address;
  const [data, error, loading, fetchBalance, hide, updateHide] =
    useBalanceStore((state) => [
      state.data,
      state.error,
      state.loading,
      state.fetchBalance,
      state.hide,
      state.updateHide,
    ]);
  const triggerFeedback = useHapticFeedback();
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    updateHide(getItem("hideBalance"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleRetryClick = () => {
    triggerFeedback("medium");
    fetchBalance(address || "");
  };

  if (error || data?.code || !data?.result) {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="p-8"
        onClick={handleRetryClick}
      >
        <RotateCw strokeWidth={2} style={{ width: "32px", height: "32px" }} />
      </Button>
    );
  }

  const { wholePart, decimalPart } = convertTonsValue(data.result);

  const handleBalanceClick = () => {
    triggerFeedback("medium");
    updateHide(!hide);
    setItem("hideBalance", String(!hide));
  };

  return (
    <div
      className={cn(
        "mb-1 flex flex-col items-center justify-center gap-2",
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
          <div
            className="flex items-end font-bold"
            onClick={handleBalanceClick}
          >
            {hide ? (
              <Badge
                variant="secondary"
                className="flex items-center justify-center px-6 py-3"
              >
                <Asterisk
                  count={3}
                  strokeWidth={2.4}
                  className="-mx-[1px]"
                  width={34}
                  height={34}
                />
              </Badge>
            ) : (
              <>
                <span className="text-6xl">{wholePart || "0"}</span>
                <span className="text-5xl">,{decimalPart || "00"}</span>
                <span className="pl-2 text-2xl uppercase opacity-60">ton</span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
