"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { ChevronLeft, Globe, History, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  BalanceWithRate,
  Button,
  Card,
  ChartContainer,
  Container,
  IconButtons,
  Skeleton,
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

  const { fullPart } = convertTonsValue(data.result, false);

  return (
    <Container className="my-8 flex flex-col items-center justify-center gap-6">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-0 top-0 h-8 w-8 rounded-full"
        onClick={() => {
          triggerFeedback("light");
          router.push("/");
        }}
      >
        <ChevronLeft style={{ width: 18, height: 18 }} />
      </Button>
      <p className="text-center text-xl font-semibold">
        {coinName(params.token as string)}
      </p>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          {loading ? (
            <Skeleton className="h-7 w-52 rounded-md" />
          ) : (
            <Balance hide={hide} balance={data.result} fullPart={fullPart} />
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

        <Image src="/ton-logo.svg" width={60} height={60} alt="Toncoin logo" />
      </div>

      {wallet && <IconButtons className="mt-4" />}

      <Card className="flex items-center gap-3 bg-warning/15 p-3 text-warning">
        <TriangleAlert size={58} />
        <span className="text-xs">{t("warnMessage.title")}</span>
      </Card>

      {rate?.rates && (
        <RateDetails
          tonPrice={rate?.rates?.TON?.prices.USD}
          diff_24h={rate?.rates?.TON?.diff_24h.USD}
          diff_7d={rate?.rates?.TON?.diff_7d.USD}
          diff_30d={rate?.rates?.TON?.diff_30d.USD}
          isLoading={isRateLoading}
        />
      )}
      <ChartContainer />

      {wallet && (
        <>
          <Card
            className="flex w-full items-center gap-2 py-6"
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
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3"
            onClick={() => triggerFeedback("light")}
          >
            <Globe
              className="text-primary/90"
              style={{ width: 18, height: 18 }}
            />
            <span>{t("more.title")}</span>
          </Link>
        </>
      )}
    </Container>
  );
}
