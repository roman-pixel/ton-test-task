"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Button,
  Container,
  Transaction,
  TransactionDate,
  TransactionError,
  TransactionMessage,
  TransactionSkeleton,
} from "@/shared/components";
import { useHapticFeedback, useTransactions } from "@/shared/hooks";
import { groupTransactionsByDate } from "@/shared/lib";
import { Transaction as TransactionType } from "@/shared/types/transaction-types";

const TRANSACTION_LIMIT = 10;

export default function Transactions() {
  const t = useTranslations("Transactions");
  const wallet = useTonWallet();
  const router = useRouter();
  const locale = useLocale();
  const triggerFeedback = useHapticFeedback();
  const [offset, setOffset] = useState(0);
  const [allTransactions, setAllTransactions] = useState<TransactionType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    transactions: transactionsResponse,
    isLoading,
    isError,
    error,
    fetchTransactions,
  } = useTransactions(wallet?.account.address, TRANSACTION_LIMIT, offset);

  const loadMore = () => {
    setOffset((prev) => prev + 10);
    triggerFeedback("light");
  };

  useEffect(() => {
    function setTransactions() {
      if (transactionsResponse?.transactions) {
        if (transactionsResponse.transactions.length >= TRANSACTION_LIMIT) {
          setAllTransactions((prevTransactions) => [
            ...prevTransactions,
            ...transactionsResponse.transactions,
          ]);
        } else {
          setHasMore(false);
        }
      }
    }

    if (isError) {
      setAllTransactions([]);
      return;
    }

    setTransactions();
  }, [isError, transactionsResponse]);

  useEffect(() => {
    if (!wallet) {
      router.replace(`/${locale}`);
    }
  }, [wallet, router, locale]);

  if (isError) {
    return (
      <TransactionError
        error={error}
        onClick={() => {
          triggerFeedback("light");
          fetchTransactions();
        }}
      />
    );
  }

  if (allTransactions?.length === 0) {
    return (
      <TransactionMessage
        message={t("noTransactions.message")}
        label={t("noTransactions.label")}
      />
    );
  }

  const currentMonth = new Date().getMonth();

  const groupedTransactions = groupTransactionsByDate(
    allTransactions,
    currentMonth,
  );

  return (
    <Container className="mb-24 flex flex-col gap-2">
      <p className="text-2xl font-semibold tracking-wide">{t("title")}</p>
      {isLoading && !allTransactions ? (
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
      {hasMore && (
        <Button
          variant="secondary"
          className="mb-2 mt-4 w-full"
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? t("loadMore.loading") : t("loadMore.message")}
        </Button>
      )}
    </Container>
  );
}
