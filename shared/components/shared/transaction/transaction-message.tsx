"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "../../ui";
import { Container } from "../container";

import { cn } from "@/shared/lib/utils";

interface Props {
  message: string;
  label?: string;
  className?: string;
}

export const TransactionMessage: React.FC<Props> = ({
  message,
  label,
  className,
}) => {
  const router = useRouter();

  return (
    <Container
      className={cn(
        "flex h-[70vh] flex-col items-center justify-center gap-5",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-2xl font-semibold">{message}</p>
        {label && (
          <p className="text-lg tracking-wide text-foreground/60">{label}</p>
        )}
      </div>

      <Button variant="secondary" onClick={() => router.push("/")}>
        На главную
      </Button>
    </Container>
  );
};
