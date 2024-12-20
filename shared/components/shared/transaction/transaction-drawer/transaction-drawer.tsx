"use client";

import { format, fromUnixTime } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
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
import { useClipboard, useHapticFeedback } from "@/shared/hooks";
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
  const t = useTranslations("Transactions.Transaction");
  const locale = useLocale();
  const { copyToClipboard } = useClipboard();
  const triggerFeedback = useHapticFeedback();

  const dateFnsLocale = locale === "en" ? enUS : ru;

  const formattedDate = format(fromUnixTime(date), "d MMMM, HH:mm", {
    locale: dateFnsLocale,
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
              src="/ton-logo.svg"
              width={80}
              height={80}
              alt="Toncoin logo"
              className="mb-4"
            />
            {isError ? (
              <DrawerTitle className="text-orange-500">
                {t("error")}
              </DrawerTitle>
            ) : (
              <>
                <DrawerTitle className="text-2xl">
                  <span className="mr-[2px]">{isIncoming ? "+" : "−"}</span>
                  {t("amount", { amount: tonValue })}
                </DrawerTitle>
                <DrawerDescription>
                  {t("amount", { amount: tonValue })}
                </DrawerDescription>
              </>
            )}
            <DrawerDescription>
              {t(`TransactionItem.type.${isIncoming ? "received" : "sent"}`, {
                date: formattedDate,
              })}
            </DrawerDescription>
          </DrawerHeader>
          <Card className="flex flex-col gap-3">
            <div onClick={() => copyToClipboard(address)}>
              <p className="opacity-60">
                {t(
                  `TransactionItem.details.address.type.${
                    isIncoming ? "recipient" : "sender"
                  }`,
                )}
              </p>
              <p>{cutWalletAddress(address, 26)}</p>
            </div>
            <hr className="-mx-4 border-t border-secondary-foreground/5" />
            <div className="flex justify-between">
              <p className="opacity-60">{t("TransactionItem.details.fee")}</p>
              <div className="flex flex-col items-end">
                <p>{t("amount", { amount: formatFee() })}</p>
                <p className="text-sm opacity-60">
                  {t("amount", { amount: formatFee(true) })}
                </p>
              </div>
            </div>
            {comment && (
              <>
                <hr className="-mx-4 border-t border-secondary-foreground/5" />
                <div onClick={() => copyToClipboard(comment)}>
                  <p className="opacity-60">
                    {t("TransactionItem.details.comment")}
                  </p>
                  <p>{comment}</p>
                </div>
              </>
            )}
          </Card>
          <DrawerFooter className="flex items-center">
            <Link
              href={`https://testnet.tonviewer.com/transaction/${hash}`}
              target="_blank"
              onClick={() => {
                triggerFeedback("light");
              }}
            >
              <Card className="flex w-min items-center justify-center gap-1 rounded-full px-4 py-2">
                <Globe
                  style={{ width: "18px", height: "18px" }}
                  strokeWidth={2.2}
                  className="mr-1"
                />
                <p>{t("TransactionItem.transaction.title")}</p>
                <p className="opacity-60">{hash.slice(0, 8)}</p>
              </Card>
            </Link>
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
