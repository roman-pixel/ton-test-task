"use client";

import { getUnixTime, subDays, subMonths, subWeeks } from "date-fns";
import { RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { Button, Skeleton } from "../../ui";
import { Chart } from "./chart";
import { ChartButtons } from "./chart-buttons";

import { useRateChart } from "@/shared/hooks/use-rate-chart";
import { cn } from "@/shared/lib/utils";
import { RateResponseData } from "@/shared/types/rate-types";

interface Props {
  token?: string;
  className?: string;
  rate?: RateResponseData;
}

export const ChartContainer: React.FC<Props> = ({ token, className, rate }) => {
  const t = useTranslations("TonRate");
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const period = searchParams.get("period") || "daily";

  useEffect(() => {
    if (!searchParams.get("period")) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("period", "daily");
      router.push(`?${newSearchParams.toString()}`);
    }
  }, [router, searchParams]);

  const currentDate = Date.now();

  const startDate = () => {
    if (period === "weekly") return subWeeks(currentDate, 1);
    if (period === "monthly") return subMonths(currentDate, 1);

    return subDays(currentDate, 1);
  };

  const { isLoading, rateChart, error } = useRateChart(
    (params.token as string) || token,
    getUnixTime(startDate()),
    getUnixTime(currentDate),
    200,
  );

  if (error) return;

  if (rateChart?.error) {
    return (
      <div className="flex flex-col items-center gap-3 pb-3">
        <p className="text-2xl">{rateChart.error}</p>
        {rateChart.error_code && (
          <p className="text-xl">
            {t("error.code", { code: rateChart.error_code })}
          </p>
        )}
        <Button className="w-1h-16 h-16" variant="secondary">
          <RotateCw style={{ width: "32px", height: "32px" }} />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("gap- 1 flex w-full flex-col", className)}>
      {isLoading && !rateChart ? (
        <Skeleton className="h-64 w-full rounded-md bg-background dark:bg-muted" />
      ) : (
        <>
          <Chart data={rateChart} token={token} rate={rate} />
          <ChartButtons />
        </>
      )}
    </div>
  );
};
