import {
  format,
  fromUnixTime,
  isThisMonth,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";
import { ru } from "date-fns/locale";
import React, { PropsWithChildren } from "react";

interface Props {
  date: number;
}

export const TransactionDate: React.FC<PropsWithChildren<Props>> = ({
  date,
  children,
}) => {
  const getFormattedDate = () => {
    const fromUnixDate = fromUnixTime(date);

    if (isToday(fromUnixDate)) {
      return "Cегодня";
    } else if (isYesterday(fromUnixDate)) {
      return "Вчера";
    } else if (isThisMonth(fromUnixDate)) {
      return format(fromUnixDate, "d MMMM", {
        locale: ru,
      });
    } else if (isThisYear(fromUnixDate)) {
      const month = format(fromUnixDate, "LLLL", {
        locale: ru,
      });

      return month.charAt(0).toUpperCase() + month.slice(1);
    } else {
      const month = format(fromUnixDate, "LLLL, yyyy", {
        locale: ru,
      });

      return month.charAt(0).toUpperCase() + month.slice(1);
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-0 bg-background py-4 text-xl font-bold tracking-wide">
        {getFormattedDate()}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};
