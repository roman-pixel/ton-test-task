"use client";

import { useEffect, useState } from "react";

import { getRate } from "../services/getRate";
import { RateResponseData } from "../types/rate-types";

export const useRate = (
  tokens: string,
  currencies: string,
  isUpdate?: boolean,
) => {
  const [rate, setRate] = useState<RateResponseData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [currencies, tokens, isUpdate]);

  return {
    rate,
    isLoading,
    error,
  };
};
