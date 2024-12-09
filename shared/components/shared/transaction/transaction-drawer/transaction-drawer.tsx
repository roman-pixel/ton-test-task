"use client";

import { format, fromUnixTime } from "date-fns";
import { ru } from "date-fns/locale";
import { Globe } from "lucide-react";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

import { Card } from "../../card";
import { Container } from "../../container";
import { DrawerCloseButton } from "../../drawer-close-button";

import { TON_MULTIPLIER } from "@/shared/components/constants/ton";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { useClipboard } from "@/shared/hooks";
import { cutWalletAddress } from "@/shared/lib";

interface Props {
  isIncoming: boolean;
  address: string;
  tonValue: number;
  date: number;
  comment?: string | undefined;
  fee: number;
  hash: string;
  isError?: boolean;
}

export const TransactionDrawer: React.FC<PropsWithChildren<Props>> = ({
  isIncoming,
  address,
  tonValue,
  date,
  comment,
  fee,
  hash,
  isError,
  children,
}) => {
  const { copyToClipboard } = useClipboard();

  const formattedDate = format(fromUnixTime(date), "d MMMM, HH:mm", {
    locale: ru,
  });

  const formatFee = (isRounded?: boolean) => {
    let value = Number(fee) / TON_MULTIPLIER;

    if (isRounded) {
      value = Math.floor(value * 10000) / 10000;
    }

    return String(value).replace(".", ",");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="flex w-full flex-col gap-4 py-8">
          <DrawerCloseButton />
          <DrawerHeader className="flex flex-col items-center gap-1">
            <Image
              src="ton-logo.svg"
              width={80}
              height={80}
              alt="Toncoin logo"
              className="mb-4"
            />
            {isError ? (
              <DrawerTitle className="text-orange-500">Неуспешно</DrawerTitle>
            ) : (
              <>
                <DrawerTitle className="text-2xl">
                  <span className="mr-[2px]">{isIncoming ? "+" : "−"}</span>
                  {tonValue} TON
                </DrawerTitle>
                <DrawerDescription>{tonValue} TON</DrawerDescription>
              </>
            )}
            <DrawerDescription>
              {isIncoming ? "Получено" : "Отправлено"} {formattedDate}
            </DrawerDescription>
          </DrawerHeader>
          <Card className="flex flex-col gap-3">
            <div onClick={() => copyToClipboard(address)}>
              <p className="opacity-60">
                Адрес {isIncoming ? "отправителя" : "получателя"}
              </p>
              <p>{cutWalletAddress(address, 26)}</p>
            </div>
            <hr className="-mx-4 border-t border-secondary-foreground/5" />
            <div className="flex justify-between">
              <p className="opacity-60">Комиссия</p>
              <div className="flex flex-col items-end">
                <p>{formatFee()} TON</p>
                <p className="text-sm opacity-60">{formatFee(true)} TON</p>
              </div>
            </div>
            {comment && (
              <>
                <hr className="-mx-4 border-t border-secondary-foreground/5" />
                <div onClick={() => copyToClipboard(comment)}>
                  <p className="opacity-60">Комментарий</p>
                  <p>{comment}</p>
                </div>
              </>
            )}
          </Card>
          <DrawerFooter className="flex items-center">
            <a href={`https://testnet.tonviewer.com/transaction/${hash}`}>
              <Card className="flex w-min items-center justify-center gap-1 rounded-full px-4 py-2">
                <Globe
                  style={{ width: "18px", height: "18px" }}
                  strokeWidth={2.2}
                  className="mr-1"
                />
                <p>Транзакция</p>
                <p className="opacity-60">{hash.slice(0, 8)}</p>
              </Card>
            </a>
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
