"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "../../ui";
import { Container } from "../container";

import { useHapticFeedback } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  message: string;
  label?: string;
  className?: string;
}

export const TransactionMessage: React.FC<Props> = ({
  message,
  label,
  className,
}) => {
  const t = useTranslations("Transactions.noTransactions");
  const router = useRouter();
  const locale = useLocale();
  const triggerFeedback = useHapticFeedback();

  const handleClick = () => {
    triggerFeedback("light");
    router.push(`/${locale}`);
  };

  return (
    <Container
      className={cn(
        "flex h-[70vh] flex-col items-center justify-center gap-5",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-2xl font-semibold">{message}</p>
        {label && (
          <p className="text-lg tracking-wide text-foreground/60">{label}</p>
        )}
      </div>

      <Button
        variant="secondary"
        size="lg"
        className="text-base text-primary"
        onClick={handleClick}
      >
        {t("backButton")}
      </Button>
    </Container>
  );
};
