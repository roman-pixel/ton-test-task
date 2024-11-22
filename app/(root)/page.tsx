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
      <div className="flex h-[85vh] flex-col items-center justify-center gap-8">
        {tonConnectUI?.account ? (
          <>
            <Balance address={wallet?.account.address} />
            <TonWalletAddress
              walletAddress={wallet?.account.address}
              tonConnectUI={tonConnectUI}
            />

            <div className="flex gap-7">
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
