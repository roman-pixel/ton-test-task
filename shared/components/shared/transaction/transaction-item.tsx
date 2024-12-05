import { format, fromUnixTime } from "date-fns";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import React from "react";

import { Comment } from "./comment";

import { cn, cutWalletAddress } from "@/shared/lib";

interface Props {
  isIncoming: boolean;
  address: string;
  tonValue: number;
  date: number;
  comment?: string | undefined;
  isError?: boolean;
}

export const TransactionItem: React.FC<Props> = ({
  isIncoming,
  address,
  tonValue,
  date,
  comment,
  isError,
}) => {
  const formattedDate = format(fromUnixTime(date), "HH:mm");

  return (
    <>
      <div className="min-w-screen mr-2 rounded-full bg-[#D1DDE8] p-3 text-[#708DA7] dark:bg-[#323C4C]">
        {isIncoming ? (
          <ArrowDownToLine strokeWidth={2.5} />
        ) : (
          <ArrowUpFromLine strokeWidth={2.5} />
        )}
      </div>
      <div>
        <p className="font-semibold">
          {isIncoming ? "Получено" : "Отправлено"}
        </p>
        <p className="text-sm text-secondary-foreground/70">
          {cutWalletAddress(address, 8)}
        </p>
      </div>

      <div className="flex flex-col items-end">
        {isError ? (
          <p className="text-orange-500">неуспешно</p>
        ) : (
          <p
            className={cn("font-semibold", {
              "text-green-600": isIncoming,
            })}
          >
            <span className="mr-[2px]">{isIncoming ? "+" : "−"}</span>
            {tonValue} TON
          </p>
        )}
        <p className="text-sm text-secondary-foreground/70">
          {formattedDate.toLocaleString()}
        </p>
      </div>

      {comment && <Comment comment={comment} />}
    </>
  );
};
