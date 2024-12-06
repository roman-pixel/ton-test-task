import React from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "xs:px-0 relative mx-auto w-full max-w-[350px] px-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
