import React from "react";

import { Container } from "./container";
import { Logo } from "./logo";

export const Header: React.FC = () => {
  return (
    <Container className="flex items-center justify-center p-5">
      <Logo />
    </Container>
  );
};
