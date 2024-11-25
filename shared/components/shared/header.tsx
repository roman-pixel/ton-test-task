import React from "react";

import { Container } from "./container";
import { HeaderMenu } from "./header-menu";
import { Logo } from "./logo";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn(className)}>
      <Container className="flex items-center justify-between px-2 py-6">
        <Logo />
        <HeaderMenu />
      </Container>
    </header>
  );
};
