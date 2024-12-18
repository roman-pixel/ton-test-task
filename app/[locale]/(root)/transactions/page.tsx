"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Container,
  Transaction,
  TransactionDate,
  TransactionError,
  TransactionMessage,
  TransactionSkeleton,
} from "@/shared/components";
import { useTransactions } from "@/shared/hooks";
import { groupTransactionsByDate } from "@/shared/lib";

export default function Transactions() {
  const t = useTranslations("Transactions");
  const wallet = useTonWallet();
  const router = useRouter();
  const locale = useLocale();

  const {
    transactions: transactionsResponse,
    isLoading,
    isError,
    error,
    fetchTransactions,
  } = useTransactions(wallet?.account.address);

  useEffect(() => {
    if (!wallet) {
      router.replace(`/${locale}`); // вызов replace после рендера
    }
  }, [wallet, router, locale]);

  if (isError) {
    return <TransactionError error={error} onClick={fetchTransactions} />;
  }

  if (transactionsResponse?.transactions?.length === 0) {
    return (
      <TransactionMessage
        message={t("noTransactions.message")}
        label={t("noTransactions.label")}
      />
    );
  }

  const { transactions } = transactionsResponse || {};

  const currentMonth = new Date().getMonth();

  const groupedTransactions = groupTransactionsByDate(
    transactions,
    currentMonth,
  );

  return (
    <Container className="flex flex-col gap-2">
      <p className="text-2xl font-semibold tracking-wide">{t("title")}</p>
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
