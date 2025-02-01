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
        "text-green-foreground": value?.startsWith("+"),
        "text-red-foreground": value?.startsWith("−"),
      })}
    >
      {children}
    </div>
  );
};
