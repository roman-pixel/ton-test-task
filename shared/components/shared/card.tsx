import React, { forwardRef } from "react";

import { cn } from "@/shared/lib";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-secondary p-4 text-secondary-foreground",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";
