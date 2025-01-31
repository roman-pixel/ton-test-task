"use client";

import { useEffect, useState } from "react";

import { getRateChart } from "../services/getRate";
import { RateChartResponseData } from "../types/rate-chart-types";

export const useRateChart = (
  token: string | undefined,
  startDate: number,
  endDate: number,
  pointsCount: number,
  isUpdate?: boolean,
) => {
  const [rateChart, setRateChart] = useState<RateChartResponseData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        setIsLoading(true);

        if (!token) throw new Error("No token");

        const res = await getRateChart(
          token,
          "usd",
          startDate,
          endDate,
          pointsCount,
        );
        const data = await res.json();
        setRateChart(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error("Error [GET RATE]", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRate();

    if (isUpdate) {
      const interval = setInterval(() => {
        fetchRate();
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [token, startDate, endDate, pointsCount, isUpdate]);

  return {
    rateChart,
    isLoading,
    error,
  };
};
