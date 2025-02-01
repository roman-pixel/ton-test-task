"use client";

import { Locale, format } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip } from "../../ui/chart";

import { useDiffValue } from "@/shared/hooks";
import { RateChartResponseData } from "@/shared/types/rate-chart-types";
import { RateResponseData } from "@/shared/types/rate-types";

interface Props {
  data: RateChartResponseData | undefined;
  token?: string;
  rate?: RateResponseData;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  token,
  locale,
}: {
  active?: boolean;
  payload?: { timestamp: number; value: number }[];
  label?: string;
  token: string | undefined;
  locale: Locale;
}) => {
  const t = useTranslations("TonRate.toolTip");

  if (active && payload && payload.length && label) {
    return (
      <div className="flex flex-col gap-1 rounded-md border bg-background/60 p-2 backdrop-blur-md">
        <p>{format(Number(label) * 1000, "dd MMM, HH:mm", { locale })}</p>
        <p>{`${token ? token : t("title")}: ${payload[0].value.toFixed(4)}`}</p>
      </div>
    );
  }

  return null;
};

export const Chart: React.FC<Props> = ({ data, token, rate }) => {
  const locale = useLocale();
  const params = useParams();
  const searchParams = useSearchParams();
  const { diffValue } = useDiffValue(
    rate,
    (params.token as string) || "ton",
    "usd",
  );

  const dateFnsLocale = locale === "en" ? enUS : ru;

  const formattedRateChart = data?.points
    ?.map(([timestamp, value]) => ({
      timestamp,
      value,
    }))
    .reverse();

  const setChartColor = () => {
    if (diffValue?.startsWith("+")) {
      return "hsl(var(--chart-green))";
    }
    return "hsl(var(--chart-red))";
  };

  const chartConfig = {
    mobile: {
      color: rate ? setChartColor() : "hsl(var(--chart-default))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-52 w-full">
      <LineChart accessibilityLayer data={formattedRateChart}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamp"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(timestamp) =>
            format(
              timestamp * 1000,
              searchParams.get("period") === "daily" ? "HH:mm" : "dd MMM",
              { locale: dateFnsLocale },
            )
          }
        />

        <YAxis
          dataKey="value"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          domain={["auto", "auto"]}
          tickFormatter={(value) => `${value.toFixed(3)}`}
          orientation="right"
        />

        <ChartTooltip
          cursor={false}
          content={
            <CustomTooltip
              token={(params.token as string) || token}
              locale={dateFnsLocale}
            />
          }
        />
        <Line
          dataKey="value"
          stroke="var(--color-mobile)"
          radius={4}
          type="natural"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
};
