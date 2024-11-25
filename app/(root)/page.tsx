"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { ArrowUp, Plus } from "lucide-react";
import { useState } from "react";

import {
  Balance,
  Button,
  Container,
  IconButton,
  QrCode,
  TonWalletAddress,
  TransferForm,
} from "@/shared/components";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  return (
    <Container className="relative">
      <div className="flex flex-col items-center justify-center gap-6">
        {wallet ? (
          <>
            <Balance address={wallet?.account.address} />
            <TonWalletAddress walletAddress={wallet?.account.address} />

            <div className="mt-4 flex gap-7">
              <TransferForm
                isOpen={isTransferOpen}
                onclose={() => setIsTransferOpen(false)}
              />
              <IconButton
                label="Отправить"
                icon={
                  <ArrowUp
                    className="text-background"
                    style={{ width: "21px", height: "21px" }}
                  />
                }
                onClick={() => setIsTransferOpen(true)}
              />
              <QrCode address={wallet?.account.address}>
                <IconButton
                  label="Пополнить"
                  icon={
                    <Plus
                      className="text-background"
                      style={{ width: "21px", height: "21px" }}
                    />
                  }
                />
              </QrCode>
            </div>
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
