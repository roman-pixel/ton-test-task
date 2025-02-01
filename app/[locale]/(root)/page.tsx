"use client";

import { useTonWallet } from "@tonconnect/ui-react";

import {
  Balance,
  Container,
  CurrencyContainer,
  IconButtons,
  NotAuth,
  TonWalletAddress,
} from "@/shared/components";

export default function Home() {
  const wallet = useTonWallet();

  if (!wallet) return <NotAuth />;

  return (
    <Container className="relative">
      <div className="mt-8 flex flex-col items-center justify-center gap-6">
        <Balance />
        <TonWalletAddress />
        <IconButtons className="mt-4" />
        <CurrencyContainer className="mt-4 w-full" />
      </div>
    </Container>
  );
}
