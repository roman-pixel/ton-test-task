import { Frown } from "lucide-react";
import React from "react";

import { Button } from "../../ui";
import { Container } from "../container";

import { cn } from "@/shared/lib/utils";

interface Props {
  error: string | null;
  onClick?: () => void;
  className?: string;
}

export const TransactionError: React.FC<Props> = ({
  error,
  onClick,
  className,
}) => {
  const { code, result } = JSON.parse(error || "{}");

  return (
    <Container
      className={cn(
        "flex h-[70vh] flex-col items-center justify-center gap-8",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-7xl font-semibold text-primary">{code}</p>
        <p className="text-2xl tracking-wide text-foreground">{result}</p>
      </div>
      <Button variant="secondary" className="text-primary" onClick={onClick}>
        Попробовать снова
      </Button>
    </Container>
  );
};
