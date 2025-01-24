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
        <Asterisk count={3} />
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
