"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { ArrowUp, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { IconButton } from "./icon-button";
import { QrCode } from "./qr-code";
import { TransferForm } from "./transfer-form";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const IconButtons: React.FC<Props> = ({ className }) => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const router = useRouter();
  const wallet = useTonWallet();

  return (
    <div className={cn("flex gap-6", className)}>
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
      {/* <IconButton
        label="История"
        icon={
          <History
            className="text-background"
            style={{ width: "21px", height: "21px" }}
          />
        }
        onClick={() => router.push("/transactions")}
      /> */}
    </div>
  );
};
