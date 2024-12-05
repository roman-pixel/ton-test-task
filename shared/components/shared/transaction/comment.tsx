import React from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  comment: string;
  className?: string;
}

export const Comment: React.FC<Props> = ({ comment, className }) => {
  return (
    <div
      className={cn(
        "col-span-full col-start-2 row-start-2 flex max-w-max items-center justify-center rounded-xl bg-[#D1DDE8] p-2 dark:bg-[#323C4C]",
        className,
      )}
    >
      <p className="line-clamp-2 text-wrap px-1 text-sm text-secondary-foreground">
        {comment}
      </p>
    </div>
  );
};
