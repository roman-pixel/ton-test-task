import { useCallback, useEffect, useState } from "react";

import { getTransactions } from "../services/getTransactions";
import { TransactionsResponse } from "../types/transaction-types";

export const useTransactions = (
  address: string | undefined,
  limit?: number,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsResponse | null>(
    null,
  );
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      const res = await getTransactions(address || "", "desc", limit);
      const data = await res.json();
      setTransactions(data);

      if ("ok" in data && !data.ok) {
        throw new Error(
          JSON.stringify({ code: data.code, result: data.result }),
        );
      }
    } catch (error: any) {
      console.error("Error [GET TRANSACTIONS]", error);
      setIsError(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [address, limit]);

  useEffect(() => {
    if (address) {
      fetchTransactions();
    }
  }, [address, limit, fetchTransactions]);

  return {
    transactions,
    isLoading,
    isError,
    error,
    refetch: fetchTransactions,
  };
};
