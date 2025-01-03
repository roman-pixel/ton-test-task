"use client";

import { useEffect, useState } from "react";

import { getRate } from "../services/getRate";
import { RateResponseData } from "../types/rate-types";

export const useRate = (tokens: string, currencies: string) => {
  const [rate, setRate] = useState<RateResponseData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRate() {
      try {
        setIsLoading(true);

        const res = await getRate(tokens, currencies);
        const data = await res.json();
        setRate(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error("Error [GET RATE]", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRate();

    const interval = setInterval(() => {
      fetchRate();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currencies, tokens]);

  return {
    rate,
    isLoading,
  };
};
