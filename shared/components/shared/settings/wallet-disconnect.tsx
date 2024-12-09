import React, { PropsWithChildren } from "react";

import { Button } from "../../ui";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Container } from "../container";
import { DrawerCloseButton } from "../drawer-close-button";

interface Props {
  onClick: () => void;
}

export const WalletDisconnect: React.FC<PropsWithChildren<Props>> = ({
  onClick,
  children,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="mb-4">
          <DrawerCloseButton />
          <DrawerHeader className="mt-6">
            <DrawerTitle>Выйти</DrawerTitle>
            <DrawerDescription>
              Вы действительно хотите выйти?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button
                className="w-full text-destructive dark:text-red-500"
                variant="secondary"
                onClick={onClick}
              >
                Выйти
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
