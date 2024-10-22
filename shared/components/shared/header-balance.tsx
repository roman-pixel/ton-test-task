"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

import { Button, Skeleton } from "../ui";
import { Container } from "./container";

import { convertTonsValue } from "@/shared/lib/convert-tons-value";
import { cn } from "@/shared/lib/utils";
import { useBalanceStore } from "@/shared/store/balance";

interface Props {
  className?: string;
}

export const HeaderBalance: React.FC<Props> = ({ className }) => {
  const wallet = useTonWallet();
  const [data, error, loading, fetchBalance] = useBalanceStore((state) => [
    state.data,
    state.error,
    state.loading,
    state.fetchBalance,
  ]);

  useEffect(() => {
    if (wallet?.account.address) fetchBalance(wallet?.account.address);
  }, [wallet?.account.address]);

  if (error || data?.error) {
    return null;
  }

  const { wholePart, decimalPart } = convertTonsValue(data.balance);

  return (
    <header className={cn("relative", className)}>
      <Container className="absolute inset-0 flex items-center justify-between p-7">
        <Link href="/">
          <Button
            size="icon"
            variant="link"
            className="hover:text-accent-foreground hover:no-underline"
          >
            <ChevronLeft />
            <span>Назад</span>
          </Button>
        </Link>

        {loading ? (
          <>
            <Skeleton className="h-8 w-28" />
          </>
        ) : (
          <>
            <div className="flex items-center text-xl font-bold">
              <span>{wholePart}</span>
              <span>,{decimalPart}</span>
              <span className="pl-2 text-sm uppercase opacity-60">ton</span>
            </div>
          </>
        )}
      </Container>
    </header>
  );
};
