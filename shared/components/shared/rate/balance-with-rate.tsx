import React from "react";

import { Asterisk } from "../asterisk";

import { convertUsdValue } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";

interface Props {
  hide: boolean;
  fullPart: number;
  rate: number;
  className?: string;
}

export const BalanceWithRate: React.FC<Props> = ({
  hide,
  fullPart,
  rate,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-foreground/60",
        className,
      )}
    >
      {hide ? (
        <div className="flex items-center">
          <Asterisk
            className="text-muted-foreground"
            count={3}
            width={20}
            height={20}
          />
        </div>
      ) : (
        rate && (
          <p className="flex items-center gap-[2px]">
            <span>$</span>
            <span>{convertUsdValue(fullPart, rate)}</span>
          </p>
        )
      )}
    </div>
  );
};
