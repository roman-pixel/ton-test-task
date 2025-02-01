import { TriangleAlert } from "lucide-react";
import React from "react";

import { Card } from "./card";

import { cn } from "@/shared/lib/utils";

interface Props {
  message: string;
  className?: string;
}

export const Warning: React.FC<Props> = ({ message, className }) => {
  return (
    <Card
      className={cn(
        "flex items-center gap-3 bg-attention/20 p-3 text-attention-foreground/90",
        className,
      )}
    >
      <TriangleAlert size={58} />
      <span className="text-xs">{message}</span>
    </Card>
  );
};
