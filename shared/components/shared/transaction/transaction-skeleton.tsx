import React from "react";

import { Skeleton } from "../../ui";
import { Card } from "../card";

import { cn } from "@/shared/lib";

interface Props {
  count: number;
  className?: string;
}

export const TransactionSkeleton: React.FC<Props> = ({ count, className }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Card
          key={index}
          className={cn("flex items-center justify-between", className)}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full bg-background" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-28 rounded-xl bg-background" />
              <Skeleton className="h-5 w-20 rounded-xl bg-background" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-5 w-12 rounded-xl bg-background" />
            <Skeleton className="h-5 w-16 rounded-xl bg-background" />
          </div>
        </Card>
      ))}
    </>
  );
};
