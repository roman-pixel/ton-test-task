import { useTranslations } from "next-intl";
import React, { PropsWithChildren } from "react";

import { Badge } from "../../ui";
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
  const t = useTranslations("Settings.logout.logoutDrawer");

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container>
          <DrawerCloseButton />
          <DrawerHeader className="mt-6">
            <DrawerTitle>{t("title")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter onClick={onClick}>
            <DrawerClose>
              <Badge
                className="flex h-12 w-full justify-center rounded-md text-sm text-destructive dark:text-red-500"
                variant="secondary"
              >
                {t("confirmButton")}
              </Badge>
            </DrawerClose>
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
