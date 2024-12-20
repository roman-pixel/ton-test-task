"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { ArrowUp, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { IconButton } from "./icon-button";
import { QrCode } from "./qr-code";
import { TransferForm } from "./transfer-form";

import { useHapticFeedback } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const IconButtons: React.FC<Props> = ({ className }) => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const wallet = useTonWallet();
  const t = useTranslations("Wallet");
  const triggerFeedback = useHapticFeedback();

  return (
    <div className={cn("flex gap-6", className)}>
      <TransferForm
        isOpen={isTransferOpen}
        onclose={() => setIsTransferOpen(false)}
      />
      <IconButton
        label={t("transfer.title")}
        icon={
          <ArrowUp
            className="text-background"
            style={{ width: "21px", height: "21px" }}
          />
        }
        onClick={() => {
          setIsTransferOpen(true);
          triggerFeedback("light");
        }}
      />
      <QrCode address={wallet?.account.address}>
        <IconButton
          label={t("topUp.title")}
          icon={
            <Plus
              className="text-background"
              style={{ width: "21px", height: "21px" }}
            />
          }
          onClick={() => triggerFeedback("light")}
        />
      </QrCode>
    </div>
  );
};
