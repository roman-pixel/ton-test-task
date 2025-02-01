import Image from "next/image";
import React from "react";

import { Skeleton } from "../../ui";
import { Asterisk } from "../asterisk";
import { Card } from "../card";
import { TokenDiff } from "../token-diff";

import { convertTonsValue, convertUsdValue } from "@/shared/lib";
import { useBalanceStore } from "@/shared/store/balance";

interface Props {
  iconPath: string;
  inconAlt: string;
  currencyName: string;
  currencyPrice: number | undefined;
  currencyDiff: string | undefined;
  isLoading: boolean;
  onClick?: () => void;
}

export const CurrencyCard: React.FC<Props> = ({
  iconPath,
  inconAlt,
  currencyName,
  currencyPrice,
  currencyDiff,
  isLoading,
  onClick,
}) => {
  const [data, hide] = useBalanceStore((state) => [state.data, state.hide]);

  const { fullPart } = convertTonsValue(data?.result);

  return (
    <Card className="flex items-center justify-between" onClick={onClick}>
      <div className="flex items-center gap-3">
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full bg-background" />
        ) : (
          <Image src={iconPath} width={40} height={40} alt={inconAlt} />
        )}
        <div>
          {isLoading ? (
            <Skeleton className="mb-2 h-5 w-20 bg-background" />
          ) : (
            <p className="font-medium">{currencyName}</p>
          )}

          {isLoading ? (
            <Skeleton className="h-4 w-28 bg-background" />
          ) : (
            <div className="flex gap-2 text-sm">
              {currencyPrice && (
                <p className="opacity-70">
                  <span className="mr-[1px]">$</span>
                  {String(Math.floor(currencyPrice * 100) / 100).replace(
                    ".",
                    ",",
                  )}
                </p>
              )}
              <TokenDiff value={currencyDiff} className="opacity-90">
                {currencyDiff}
              </TokenDiff>
            </div>
          )}
        </div>
      </div>
      {data?.ok && (
        <div className="flex flex-col items-end">
          {isLoading ? (
            <Skeleton className="mb-2 h-5 w-14 bg-background" />
          ) : (
            <div className="font-medium">
              {hide ? (
                <div className="flex">
                  <Asterisk
                    count={3}
                    strokeWidth={2.4}
                    className="-mx-[2px]"
                    width={18}
                    height={18}
                  />
                </div>
              ) : fullPart ? (
                String(fullPart).replace(".", ",")
              ) : (
                "0,00"
              )}
            </div>
          )}
          {isLoading ? (
            <Skeleton className="h-4 w-12 bg-background" />
          ) : (
            currencyPrice && (
              <div className="text-sm opacity-70">
                {hide ? (
                  <div className="mt-1 flex">
                    <Asterisk
                      count={3}
                      strokeWidth={2.4}
                      className="-mx-[2px]"
                      width={15}
                      height={15}
                    />
                  </div>
                ) : (
                  <>
                    <span className="mr-[1px]">$</span>
                    <span>{convertUsdValue(fullPart, currencyPrice)}</span>
                  </>
                )}
              </div>
            )
          )}
        </div>
      )}
    </Card>
  );
};
