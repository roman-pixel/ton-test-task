"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Wallet");

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
          <div className="flex h-[65vh] items-center">
            <Button
              className="relative rounded-2xl px-6 py-8 text-lg font-bold text-white dark:shadow-[0_0_30px_10px_hsla(221.2,83.2%,53.3%,0.5)]"
              size="lg"
              onClick={() => tonConnectUI.openModal()}
            >
              <Plus
                style={{ width: "24px", height: "24px" }}
                strokeWidth={2.7}
              />
              {t("connectWallet.title")}
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}
