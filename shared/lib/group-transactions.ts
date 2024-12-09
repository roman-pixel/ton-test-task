import { format, fromUnixTime } from "date-fns";

import { Transaction } from "../types/transaction-types";

export const groupTransactionsByDate = (
  transactions: Transaction[] | undefined,
  currentMonth: number,
) => {
  const renderedDates = new Set<string>();
  const groupedTransactions: {
    date: number;
    transactions: Transaction[];
  }[] = [];

  transactions?.forEach((transaction) => {
    const transactionDate = fromUnixTime(transaction.now);
    let formattedDate = "";

    if (transactionDate.getMonth() === currentMonth) {
      formattedDate = format(transactionDate, "MM-dd");
    } else {
      formattedDate = format(transactionDate, "yyyy-MM");
    }

    if (!renderedDates.has(formattedDate)) {
      renderedDates.add(formattedDate);
      groupedTransactions.push({
        date: transaction.now,
        transactions: [],
      });
    }

    groupedTransactions[groupedTransactions.length - 1].transactions.push(
      transaction,
    );
  });

  return groupedTransactions;
};
