"use client";

import { Account } from "@tonconnect/ui-react";
import { Copy, Share } from "lucide-react";
import { useTranslations } from "next-intl";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";

import { Badge, Button, Skeleton } from "../ui";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Container } from "./container";
import { DrawerCloseButton } from "./drawer-close-button";

import { useClipboard, useHapticFeedback } from "@/shared/hooks";
import { convertAddress } from "@/shared/lib";

interface QrCodeProps {
  walletAccount: Account | undefined;
}

export const QrCode: React.FC<React.PropsWithChildren<QrCodeProps>> = ({
  walletAccount,
  children,
}) => {
  const t = useTranslations("Wallet.GetTonDrawer");
  const { copyToClipboard } = useClipboard();
  const [isLoading, setIsLoading] = useState(true);
  const triggerFeedback = useHapticFeedback();

  const formatedAddress = convertAddress(walletAccount?.address || "");

  useEffect(() => {
    if (!walletAccount) return;

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [walletAccount]);

  const handleShareClick = () => {
    triggerFeedback("light");

    if (navigator.share) {
      navigator
        .share({
          text: formatedAddress,
        })
        .catch((error) => console.error(t("errorMessages.shareError"), error));
    } else {
      console.warn(t("errorMessages.shareWarn"));
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="mb-4">
          <DrawerCloseButton />
          <DrawerHeader className="mt-5 flex flex-col items-center gap-3">
            <DrawerTitle className="text-xl">
              {t("drawerTitle.title")}
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {t("drawerDescription.title")}
            </DrawerDescription>
          </DrawerHeader>
          {isLoading ? (
            <Skeleton className="h-80 w-full rounded-lg" />
          ) : (
            <div className="mx-4 flex flex-col items-center gap-3 rounded-md bg-secondary p-5 dark:bg-white">
              <QRCodeCanvas
                value={walletAccount?.address || ""}
                size={260}
                level="Q"
                imageSettings={{
                  src: "/ton-logo.svg",
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
              />
              <p className="break-all text-center text-sm text-black">
                {formatedAddress}
              </p>
              {walletAccount?.chain === "-3" && (
                <Badge className="h-6 rounded-sm bg-amber-500/90 text-[10px] uppercase text-black/90">
                  Testnet
                </Badge>
              )}
            </div>
          )}
          <DrawerFooter className="mx-7 mb-4 flex-row items-center justify-center gap-3">
            <Button
              variant="secondary"
              className="h-12 rounded-full px-8"
              onClick={() => copyToClipboard(walletAccount?.address || "")}
            >
              <Copy strokeWidth={2.3} />
              <span>{t("copyButton.title")}</span>
            </Button>
            <Button
              variant="secondary"
              className="flex h-12 w-12 items-center justify-center rounded-full"
              onClick={handleShareClick}
            >
              <Share strokeWidth={2.3} />
            </Button>
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
