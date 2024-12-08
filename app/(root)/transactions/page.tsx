"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { transactions: transactionsResponse, isLoading } = useTransactions(
    wallet?.account.address,
  );

  if (!wallet) {
    router.replace("/");
    return;
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
