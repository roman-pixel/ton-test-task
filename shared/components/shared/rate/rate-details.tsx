"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Skeleton } from "../../ui";

import { cn } from "@/shared/lib/utils";

interface Props {
  tonPrice: number | undefined;
  diff_24h: string | undefined;
  diff_7d: string | undefined;
  diff_30d: string | undefined;
  isLoading?: boolean;
  className?: string;
}

export const RateDetails: React.FC<Props> = ({
  tonPrice,
  diff_24h,
  diff_7d,
  diff_30d,
  isLoading,
  className,
}) => {
  const searchParams = useSearchParams();
  const [diffValue, setDiffValue] = useState<string | undefined>("");

  useEffect(() => {
    if (searchParams.get("period") === "daily") {
      setDiffValue(diff_24h);
    } else if (searchParams.get("period") === "weekly") {
      setDiffValue(diff_7d);
    } else if (searchParams.get("period") === "monthly") {
      setDiffValue(diff_30d);
    }
  }, [diff_24h, diff_30d, diff_7d, searchParams]);

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
        <div
          className={cn("flex items-center gap-2 text-sm tracking-wide", {
            "text-green-600 dark:text-green-500": diffValue?.startsWith("+"),
            "text-destructive dark:text-red-500": diffValue?.startsWith("−"),
          })}
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
        </div>
      )}
    </div>
  );
};
