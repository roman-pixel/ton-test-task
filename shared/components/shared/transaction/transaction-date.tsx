import {
  format,
  fromUnixTime,
  isThisMonth,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import React, { PropsWithChildren } from "react";

interface Props {
  date: number;
}

export const TransactionDate: React.FC<PropsWithChildren<Props>> = ({
  date,
  children,
}) => {
  const t = useTranslations("Transactions.dates");
  const locale = useLocale();

  const dateFnsLocale = locale === "en" ? enUS : ru;

  const getFormattedDate = () => {
    const fromUnixDate = fromUnixTime(date);

    if (isToday(fromUnixDate)) {
      return t("today");
    } else if (isYesterday(fromUnixDate)) {
      return t("yesterday");
    } else if (isThisMonth(fromUnixDate)) {
      return format(fromUnixDate, "d MMMM", {
        locale: dateFnsLocale,
      });
    } else if (isThisYear(fromUnixDate)) {
      const month = format(fromUnixDate, "LLLL", {
        locale: dateFnsLocale,
      });

      return month.charAt(0).toUpperCase() + month.slice(1);
    } else {
      const month = format(fromUnixDate, "LLLL, yyyy", {
        locale: dateFnsLocale,
      });

      return month.charAt(0).toUpperCase() + month.slice(1);
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-0 bg-background py-3 text-lg font-bold tracking-wide">
        {getFormattedDate()}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};
