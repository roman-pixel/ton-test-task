"use client";

import { useTonWallet } from "@tonconnect/ui-react";

import {
  Container,
  Transaction,
  TransactionDate,
  TransactionSkeleton,
} from "@/shared/components";
import { useTransactions } from "@/shared/hooks";
import { groupTransactionsByDate } from "@/shared/lib";

export default function Transactions() {
  const wallet = useTonWallet();
  const { transactions: transactionsResponse, isLoading } = useTransactions(
    wallet?.account.address,
  );
  const { transactions } = transactionsResponse || {};

  const currentMonth = new Date().getMonth();

  const groupedTransactions = groupTransactionsByDate(
    transactions,
    currentMonth,
  );

  return (
    <Container className="flex flex-col gap-2">
      {isLoading ? (
        <TransactionSkeleton count={10} />
      ) : (
        groupedTransactions.map(({ date, transactions }) => (
          <TransactionDate key={date} date={date}>
            {transactions?.map((transaction) => (
              <Transaction key={transaction.hash} transaction={transaction} />
            ))}
          </TransactionDate>
        ))
      )}
    </Container>
  );
}
