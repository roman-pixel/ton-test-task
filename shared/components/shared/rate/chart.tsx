"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip } from "../../ui/chart";

import { RateChartResponseData } from "@/shared/types/rate-chart-types";

interface Props {
  data: RateChartResponseData | undefined;
}

const chartConfig = {
  mobile: {
    label: "Coin price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomTooltip = ({
  active,
  payload,
  label,
  param,
}: {
  active?: boolean;
  payload?: { timestamp: number; value: number }[];
  label?: string;
  param: Params;
}) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="flex flex-col gap-1 rounded-md border bg-background/60 p-2 backdrop-blur-md">
        <p className="label">
          {format(Number(label) * 1000, "dd MMM, HH:mm", { locale: ru })}
        </p>
        <p className="label">{`${param.token}: ${payload[0].value.toFixed(4)}`}</p>
      </div>
    );
  }

  return null;
};

export const Chart: React.FC<Props> = ({ data }) => {
  const params = useParams();
  const searchParams = useSearchParams();

  const formattedRateChart = data?.points
    ?.map(([timestamp, value]) => ({
      timestamp,
      value,
    }))
    .reverse();

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
              { locale: ru },
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
          content={<CustomTooltip param={params} />}
        />
        <Line
          dataKey="value"
          // TODO: dynamic color
          // fill="var(--color-mobile)"
          // stroke="var(--color-mobile)"
          radius={4}
          type="natural"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
};
