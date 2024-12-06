import React from "react";

import { Container } from "./container";
import { HeaderMenu } from "./header-menu";
import { Logo } from "./logo";

export const Header: React.FC = () => {
  return (
    <Container className="flex items-center justify-between py-6">
      <Logo />
      <HeaderMenu />
    </Container>
  );
};
