"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import {
  Balance,
  Button,
  Container,
  ModeToggle,
  TonWalletAddress,
} from "@/shared/components";
import { getBalance } from "@/shared/services/getBalance";
import { useBalanceStore } from "@/shared/store/balance";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  return (
    <Container className="relative">
      <div className="flex h-screen flex-col items-center justify-center gap-8">
        {wallet ? (
          <>
            <Balance address={wallet.account.address} />
            <TonWalletAddress walletAddress={wallet.account.address} />
            <Link href="/transfer">
              <Button size="lg">
                <ArrowUp />
                <span>Отправить</span>
              </Button>
            </Link>
            <Button
              className="text-destructive hover:text-destructive"
              size="sm"
              variant="ghost"
              onClick={() => tonConnectUI.disconnect()}
            >
              Отвязать кошелек
            </Button>
          </>
        ) : (
          <Button
            className="p-8 text-xl font-bold text-white"
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
