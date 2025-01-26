"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Button } from "../../ui";

import { useHapticFeedback } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const ChartButtons: React.FC<Props> = ({ className }) => {
  const t = useTranslations("TonRate.buttons");
  const searchParams = useSearchParams();
  const router = useRouter();
  const triggerFeedback = useHapticFeedback();

  const handleParamChange = (newParam: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("period", newParam); // Установить новое значение параметра
    router.push(`?${newSearchParams.toString()}`); // Обновить URL
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-lg bg-background p-1",
        className,
      )}
    >
      <Button
        className="w-full"
        size="sm"
        variant={searchParams.get("period") === "daily" ? "secondary" : "ghost"}
        onClick={() => {
          triggerFeedback("light");
          handleParamChange("daily");
        }}
      >
        {t("daily")}
      </Button>
      <Button
        className="w-full"
        size="sm"
        variant={
          searchParams.get("period") === "weekly" ? "secondary" : "ghost"
        }
        onClick={() => {
          triggerFeedback("light");
          handleParamChange("weekly");
        }}
      >
        {t("weekly")}
      </Button>
      <Button
        className="w-full"
        size="sm"
        variant={
          searchParams.get("period") === "monthly" ? "secondary" : "ghost"
        }
        onClick={() => {
          triggerFeedback("light");
          handleParamChange("monthly");
        }}
      >
        {t("monthly")}
      </Button>
    </div>
  );
};
