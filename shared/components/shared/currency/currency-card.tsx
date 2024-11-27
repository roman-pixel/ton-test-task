import Image from "next/image";
import React from "react";

import { Skeleton } from "../../ui";

import { convertTonsValue } from "@/shared/lib/convert-tons-value";
import { cn } from "@/shared/lib/utils";
import { useBalanceStore } from "@/shared/store/balance";

interface Props {
  iconPath: string;
  inconAlt: string;
  currencyName: string;
  currencyPrice: number | undefined;
  currencyDiff: string | undefined;
  isLoading: boolean;
  className?: string;
}

export const CurrencyCard: React.FC<Props> = ({
  iconPath,
  inconAlt,
  currencyName,
  currencyPrice,
  currencyDiff,
  isLoading,
  className,
}) => {
  const [data] = useBalanceStore((state) => [state.data]);

  const { fullPart } = convertTonsValue(data?.balance);

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg bg-secondary p-4 text-secondary-foreground",
        className,
      )}
    >
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
              <p
                className={cn("opacity-90", {
                  "text-green-600 dark:text-green-500":
                    currencyDiff?.startsWith("+"),
                  "text-destructive dark:text-red-500":
                    currencyDiff?.startsWith("−"),
                })}
              >
                {currencyDiff}
              </p>
            </div>
          )}
        </div>
      </div>
      {data?.balance && (
        <div className="flex flex-col items-end">
          {isLoading ? (
            <Skeleton className="mb-2 h-5 w-14 bg-background" />
          ) : (
            <p className="font-medium">{String(fullPart).replace(".", ",")}</p>
          )}
          {isLoading ? (
            <Skeleton className="h-4 w-12 bg-background" />
          ) : (
            currencyPrice && (
              <p className="text-sm opacity-70">
                <span className="mr-[1px]">$</span>
                {String(
                  Math.floor(fullPart * currencyPrice * 100) / 100,
                ).replace(".", ",")}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};
