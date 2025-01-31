import React, { PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  value: string | undefined;
  className?: string;
}

export const TokenDiff: React.FC<PropsWithChildren<Props>> = ({
  value,
  className,
  children,
}) => {
  return (
    <div
      className={cn(className, {
        "text-green-600 dark:text-green-500": value?.startsWith("+"),
        "text-destructive dark:text-red-500": value?.startsWith("−"),
      })}
    >
      {children}
    </div>
  );
};
