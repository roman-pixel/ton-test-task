import Image from "next/image";
import React from "react";

import { Container } from "./container";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("relative", className)}>
      <Container className="absolute inset-0 flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Image
            src="/toncoin-ton-logo.png"
            width={30}
            height={30}
            alt="Toncoin logo"
          />
          <h1 className="text-xl font-bold">TonLink Test Task</h1>
        </div>
      </Container>
    </header>
  );
};
