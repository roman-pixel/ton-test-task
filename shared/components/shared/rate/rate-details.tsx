"use client";

import { useParams } from "next/navigation";
import React from "react";

import { Skeleton } from "../../ui";
import { TokenDiff } from "../token-diff";

import { useDiffValue } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { RateResponseData } from "@/shared/types/rate-types";

interface Props {
  tonPrice: number | undefined;
  rate: RateResponseData;
  isLoading?: boolean;
  className?: string;
}

export const RateDetails: React.FC<Props> = ({
  tonPrice,
  rate,
  isLoading,
  className,
}) => {
  const params = useParams();
  const { diffValue } = useDiffValue(
    rate,
    (params.token as string) || "ton",
    "usd",
  );

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {isLoading ? (
        <Skeleton className="h-6 w-24 rounded-md" />
      ) : (
        <p className="tracking-widest">
          $ {tonPrice?.toFixed(4).replace(".", ",")}
        </p>
      )}
      {isLoading ? (
        <Skeleton className="h-5 w-28 rounded-md" />
      ) : (
        <TokenDiff
          value={diffValue}
          className="flex items-center gap-2 text-sm tracking-wide"
        >
          <p>{diffValue?.replace(".", ",")}</p>
          {diffValue && tonPrice && (
            <p className="opacity-60">
              ${" "}
              {(
                (tonPrice *
                  parseFloat(
                    diffValue
                      .replace("%", "")
                      .replace("+", "")
                      .replace("−", ""),
                  )) /
                100
              )
                .toFixed(2)
                .replace(".", ",")}
            </p>
          )}
        </TokenDiff>
      )}
    </div>
  );
};
