"use client";

import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";

import { Button, Skeleton } from "../ui";
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

import { useClipboard } from "@/shared/hooks";

interface QrCodeProps {
  address: string | undefined;
}

export const QrCode: React.FC<React.PropsWithChildren<QrCodeProps>> = ({
  address,
  children,
}) => {
  const t = useTranslations("Wallet.GetTonDrawer");
  const { copyToClipboard } = useClipboard();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [address]);

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="mb-4">
          <DrawerCloseButton className="right-0" />
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
            <div className="mx-4 flex flex-col items-center gap-4 rounded-lg bg-white p-5">
              <QRCodeCanvas
                value={address || ""}
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
                {address}
              </p>
            </div>
          )}
          <DrawerFooter className="gap-4">
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-9 w-full" />
              </>
            ) : (
              <Button onClick={() => copyToClipboard(address || "")}>
                <Copy />
                <span>{t("copyButton.title")}</span>
              </Button>
            )}
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
