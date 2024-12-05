"use client";

import { useTonWallet } from "@tonconnect/ui-react";

import { Container, Transaction } from "@/shared/components";
import { useTransactions } from "@/shared/hooks";

export default function Transactions() {
  const wallet = useTonWallet();
  const { transactions: transactionsResponse, isLoading } = useTransactions(
    wallet?.account.address,
  );
  const { transactions } = transactionsResponse || {};

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container className="flex flex-col gap-3">
      {/* <h1 className="pb-2 text-xl font-bold tracking-wide">Сегодня</h1> */}
      {transactions?.map((transaction) => (
        <Transaction key={transaction.hash} transaction={transaction} />
      ))}
    </Container>
  );
}
