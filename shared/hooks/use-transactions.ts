import { useCallback, useEffect, useState } from "react";

import { getTransactions } from "../services/getTransactions";
import { TransactionsResponse } from "../types/transaction-types";

export const useTransactions = (
  address: string | undefined,
  limit?: number,
  offset?: number,
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

      const res = await getTransactions(address || "", "desc", limit, offset);
      const data = await res.json();
      setTransactions(data);

      if (res.status !== 200) {
        throw new Error(
          JSON.stringify({
            code: res.status,
            result: data.result ? data.result : data.error,
          }),
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error [GET TRANSACTIONS]", error);
      setIsError(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [address, limit, offset]);

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
    fetchTransactions,
  };
};
