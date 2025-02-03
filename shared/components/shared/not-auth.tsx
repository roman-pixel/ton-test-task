"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

import { Button, Skeleton } from "../ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Container } from "./container";
import { ChartContainer, RateDetails } from "./rate";
import { TokenDiff } from "./token-diff";
import { Warning } from "./warning";

import { useHapticFeedback, useRate } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const NotAuth: React.FC<Props> = ({ className }) => {
  const t = useTranslations();
  const [tonConnectUI] = useTonConnectUI();
  const triggerFeedback = useHapticFeedback();
  const [isOpen, setIsOpen] = useState(false);

  const { rate, isLoading: isRateLoading } = useRate("ton", "usd");

  const handleAddWallet = () => {
    triggerFeedback("medium");
    tonConnectUI.openModal();
  };

  return (
    <Container
      className={cn(
        "mt-2 flex flex-col items-center justify-center gap-4",
        { "h-[70vh]": !isOpen },
        className,
      )}
    >
      <Button
        className="relative w-full select-none rounded-2xl py-8 text-lg font-semibold"
        size="lg"
        onClick={handleAddWallet}
      >
        <Plus style={{ width: "22px", height: "22px" }} strokeWidth={2.7} />
        {t("Wallet.connectWallet.title")}
      </Button>

      <Accordion
        type="single"
        collapsible
        className="w-full rounded-2xl bg-secondary px-2"
        onValueChange={() => setIsOpen(!isOpen)}
      >
        <AccordionItem
          value="ton-rate"
          className={cn("border-none px-2", { "px-1": isOpen })}
        >
          <AccordionTrigger className="hover:no-underline">
            <div
              className={cn("flex items-center gap-3 text-left", {
                "gap-2": isOpen,
              })}
            >
              <Image
                src={"/ton-logo.svg"}
                width={isOpen ? 23 : 40}
                height={isOpen ? 23 : 40}
                alt={"Toncoin logo"}
              />
              <div>
                <p className="text-lg">Toncoin</p>
                {isRateLoading ? (
                  <Skeleton className="className h-5 w-32 rounded-md bg-background" />
                ) : (
                  !isOpen && (
                    <div className="flex items-center gap-2 text-sm font-light">
                      <p>
                        ${" "}
                        {rate?.rates?.TON?.prices.USD.toFixed(4).replace(
                          ".",
                          ",",
                        )}
                      </p>
                      <TokenDiff value={rate?.rates?.TON?.diff_24h.USD}>
                        {rate?.rates?.TON?.diff_24h.USD.replace(".", ",")}
                      </TokenDiff>
                    </div>
                  )
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div className="flex w-full flex-col gap-2 rounded-lg">
              {rate?.rates && (
                <RateDetails
                  tonPrice={rate?.rates?.TON?.prices.USD}
                  rate={rate}
                  isLoading={isRateLoading}
                />
              )}
              <ChartContainer
                token="ton"
                rate={rate}
                className="gap-2 rounded-2xl bg-card py-4"
              />
            </div>

            <Warning message={t("TonRate.warnMessage.title")} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};
