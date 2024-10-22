"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

import {
  Balance,
  Button,
  Container,
  TonWalletAddress,
} from "@/shared/components";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  return (
    <Container className="relative">
      <div className="flex h-[85vh] flex-col items-center justify-center gap-8">
        {tonConnectUI?.account ? (
          <>
            <Balance address={wallet?.account.address} />
            <TonWalletAddress
              walletAddress={wallet?.account.address}
              tonConnectUI={tonConnectUI}
            />
            <Link href="/transfer">
              <Button
                size="lg"
                className="rounded-full px-7 py-5 dark:shadow-[0_0_30px_5px_hsla(221.2,83.2%,53.3%,0.5)]"
              >
                <ArrowUp />
                <span>Отправить</span>
              </Button>
            </Link>
          </>
        ) : (
          <Button
            className="relative rounded-full px-8 py-10 text-xl font-bold text-white dark:shadow-[0_0_30px_10px_hsla(221.2,83.2%,53.3%,0.5)]"
            size="lg"
            onClick={() => tonConnectUI.openModal()}
          >
            Привязать кошелек
          </Button>
        )}
      </div>
    </Container>
  );
}
