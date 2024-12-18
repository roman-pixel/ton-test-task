import { format, fromUnixTime, isSameMonth } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { ArrowDownToLine, ArrowUpFromLine, CircleAlert } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("Transactions.Transaction");
  const locale = useLocale();

  const dateFnsLocale = locale === "en" ? enUS : ru;
  const isCurrentMonth = isSameMonth(new Date(), fromUnixTime(date));

  const formattedDate = format(
    fromUnixTime(date),
    isCurrentMonth ? "HH:mm" : "d MMM, HH:mm",
    { locale: dateFnsLocale },
  );

  return (
    <>
      <div className="min-w-screen mr-2 rounded-full bg-[#D1DDE7] p-3 text-[#708DA7] dark:bg-[#323C4C]">
        {isError ? (
          <CircleAlert strokeWidth={2.5} />
        ) : isIncoming ? (
          <ArrowDownToLine strokeWidth={2.5} />
        ) : (
          <ArrowUpFromLine strokeWidth={2.5} />
        )}
      </div>
      <div>
        <p className="font-semibold">
          {t(`type.${isIncoming ? "received" : "sent"}`)}
        </p>
        <p className="text-sm text-secondary-foreground/70">
          {cutWalletAddress(address, 8)}
        </p>
      </div>

      <div className="flex flex-col items-end">
        {isError ? (
          <p className="lowercase text-orange-500">{t("error")}</p>
        ) : (
          <p
            className={cn("font-semibold", {
              "text-green-600": isIncoming,
            })}
          >
            <span className="mr-[2px]">{isIncoming ? "+" : "−"}</span>
            {t("amount", { amount: tonValue })}
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
