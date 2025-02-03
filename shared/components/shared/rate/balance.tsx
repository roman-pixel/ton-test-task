"use client";

import { useParams } from "next/navigation";
import React from "react";

import { Asterisk } from "../asterisk";

import { cn } from "@/shared/lib/utils";

interface Props {
  hide: boolean;
  balance: string;
  fullPart: number;
  className?: string;
}

export const Balance: React.FC<Props> = ({
  hide,
  balance,
  fullPart,
  className,
}) => {
  const params = useParams();

  return (
    <div
      className={cn("flex items-center gap-2 text-xl font-medium", className)}
    >
      {hide ? (
        <div className="flex items-center">
          <Asterisk count={3} />
        </div>
      ) : (
        <span>{balance ? String(fullPart).replace(".", ",") : "0,00"}</span>
      )}
      <span className="uppercase">{params.token}</span>
    </div>
  );
};
