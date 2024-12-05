import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);

        const res = await getTransactions(address || "", "desc", limit);
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error [GET RATE]", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (address) fetchTransactions();
  }, [address, limit]);

  return {
    transactions,
    isLoading,
  };
};
