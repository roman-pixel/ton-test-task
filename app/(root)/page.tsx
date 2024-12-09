"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

import {
  Balance,
  Button,
  Container,
  CurrencyContainer,
  IconButtons,
  TonWalletAddress,
} from "@/shared/components";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  return (
    <Container className="relative">
      <div className="mt-8 flex flex-col items-center justify-center gap-6">
        {wallet ? (
          <>
            <Balance address={wallet?.account.address} />
            <TonWalletAddress walletAddress={wallet?.account.address} />
            <IconButtons className="mt-4" />

            <CurrencyContainer className="mt-4 w-full" />
          </>
        ) : (
          <div className="flex h-[60vh] items-center">
            <Button
              className="relative rounded-full px-6 py-8 text-xl font-bold text-white dark:shadow-[0_0_30px_10px_hsla(221.2,83.2%,53.3%,0.5)]"
              size="lg"
              onClick={() => tonConnectUI.openModal()}
            >
              Привязать кошелек
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}
