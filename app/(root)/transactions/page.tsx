"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";

import {
  Container,
  Transaction,
  TransactionDate,
  TransactionError,
  TransactionSkeleton,
} from "@/shared/components";
import { useTransactions } from "@/shared/hooks";
import { groupTransactionsByDate } from "@/shared/lib";
import { TransactionsResponse } from "@/shared/types/transaction-types";

export default function Transactions() {
  const wallet = useTonWallet();
  const router = useRouter();
  const {
    transactions: transactionsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useTransactions(wallet?.account.address);

  if (!wallet) {
    router.replace("/");
    return;
  }

  if (isError) {
    return <TransactionError error={error} onClick={refetch} />;
  }

  const { transactions } = transactionsResponse || {};

  const currentMonth = new Date().getMonth();

  const groupedTransactions = groupTransactionsByDate(
    transactions,
    currentMonth,
  );

  return (
    <Container className="flex flex-col gap-2">
      <p className="text-2xl font-semibold tracking-wide">История</p>
      {isLoading ? (
        <TransactionSkeleton count={10} />
      ) : (
        <div className="flex flex-col gap-4">
          {groupedTransactions.map(({ date, transactions }) => (
            <TransactionDate key={date} date={date}>
              {transactions?.map((transaction) => (
                <Transaction key={transaction.hash} transaction={transaction} />
              ))}
            </TransactionDate>
          ))}
        </div>
      )}
    </Container>
  );
}
