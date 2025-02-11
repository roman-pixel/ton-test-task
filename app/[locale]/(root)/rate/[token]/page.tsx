"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { Globe, History } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  BalanceWithRate,
  Card,
  ChartContainer,
  Container,
  IconButtons,
  Skeleton,
  Warning,
} from "@/shared/components";
import { Balance, RateDetails } from "@/shared/components/shared/rate";
import { useHapticFeedback, useRate } from "@/shared/hooks";
import { coinName, convertAddress, convertTonsValue } from "@/shared/lib";
import { useBalanceStore } from "@/shared/store/balance";

export default function Rate() {
  const t = useTranslations("TonRate");
  const triggerFeedback = useHapticFeedback();
  const router = useRouter();
  const wallet = useTonWallet();
  const [data, hide, fetchBalance, loading] = useBalanceStore((state) => [
    state.data,
    state.hide,
    state.fetchBalance,
    state.loading,
  ]);
  const params = useParams();

  const { rate, isLoading: isRateLoading } = useRate(
    params.token as string,
    "usd",
  );

  useEffect(() => {
    if (wallet && !data.result) {
      fetchBalance(wallet.account.address);
    }
  }, [wallet, fetchBalance, data]);

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;

    if (!tg) return;

    tg.BackButton.show();

    const handleBackClick = () => {
      triggerFeedback("light");
      router.push("/");
    };

    tg.BackButton.onClick(handleBackClick);

    return () => {
      tg.BackButton.offClick(handleBackClick);
      tg.BackButton.hide();
    };
  }, [router, triggerFeedback]);

  const { fullPart } = convertTonsValue(data.result, false);

  return (
    <Container className="mb-24 mt-3 flex flex-col items-center justify-center gap-6">
      {wallet && (
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold tracking-wide">
              {coinName(params.token as string)}
            </p>
            {loading ? (
              <Skeleton className="h-7 w-52 rounded-md" />
            ) : (
              <Balance
                hide={hide}
                balance={data.result}
                fullPart={fullPart}
                className="text-lg font-medium"
              />
            )}

            {isRateLoading ? (
              <Skeleton className="h-5 w-16 rounded-md" />
            ) : (
              rate && (
                <BalanceWithRate
                  hide={hide}
                  fullPart={fullPart}
                  rate={rate?.rates?.TON?.prices.USD}
                />
              )
            )}
          </div>

          <Image
            src="/ton-logo.svg"
            width={65}
            height={65}
            alt="Toncoin logo"
          />
        </div>
      )}

      {wallet && <IconButtons className="mt-4" />}

      <Warning message={t("warnMessage.title")} />

      <div className="flex w-full flex-col gap-2 rounded-md bg-card p-3">
        {rate?.rates && (
          <RateDetails
            tonPrice={rate?.rates?.TON?.prices.USD}
            rate={rate}
            isLoading={isRateLoading}
          />
        )}
        <ChartContainer rate={rate} />
      </div>

      {wallet && (
        <>
          <Card
            className="flex w-full cursor-pointer items-center gap-2 py-6"
            onClick={() => {
              triggerFeedback("light");
              router.push("/transactions");
            }}
          >
            <History size={22} />
            <span>{t("transactionsHistory.title")}</span>
          </Card>

          <Link
            href={`https://tonviewer.com/${convertAddress(wallet?.account.address as string)}`}
            target="_blank"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-secondary px-6 py-3"
            onClick={() => triggerFeedback("light")}
          >
            <Globe style={{ width: 18, height: 18 }} />

            <span>{t("more.title")}</span>
          </Link>
        </>
      )}
    </Container>
  );
}
