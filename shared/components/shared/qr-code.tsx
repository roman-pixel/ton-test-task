"use client";

import { Copy, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";

import { Button, Skeleton } from "../ui";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Container } from "./container";

import { useClipboard } from "@/shared/hooks";

interface QrCodeProps {
  address: string | undefined;
}

export const QrCode: React.FC<React.PropsWithChildren<QrCodeProps>> = ({
  address,
  children,
}) => {
  const { copyToClipboard } = useClipboard();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [address]);

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="relative mb-4 w-full">
          <DrawerClose asChild className="absolute -top-4 right-3">
            <Button size="icon" variant="secondary" className="rounded-full">
              <X />
            </Button>
          </DrawerClose>
          <DrawerHeader className="mt-3 flex flex-col items-center gap-3">
            <DrawerTitle>Получить Toncoin</DrawerTitle>
            <DrawerDescription className="text-center">
              Отправляйте на этот адрес только Toncoin TON и токены в сети TON,
              иначе вы можете потерять свои средства
            </DrawerDescription>
          </DrawerHeader>
          {isLoading ? (
            <Skeleton className="h-80 w-full rounded-lg" />
          ) : (
            <div className="mx-4 flex flex-col items-center gap-4 rounded-lg bg-white p-5">
              <QRCodeCanvas
                value={address || ""}
                size={270}
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
                <span>Скопировать</span>
              </Button>
            )}
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
