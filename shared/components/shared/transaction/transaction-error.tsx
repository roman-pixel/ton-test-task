import { useTranslations } from "next-intl";
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
  const t = useTranslations("Transactions.error");
  const { code, result } = JSON.parse(error || "{}");

  return (
    <Container
      className={cn(
        "flex h-[70vh] flex-col items-center justify-center gap-8",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-7xl font-semibold text-primary">{code}</p>
        <p className="text-xl tracking-wide text-foreground">{result}</p>
      </div>
      {code !== 422 && (
        <Button
          variant="secondary"
          size="lg"
          className="text-base text-primary"
          onClick={onClick}
        >
          {t("buttonRetry")}
        </Button>
      )}
    </Container>
  );
};
