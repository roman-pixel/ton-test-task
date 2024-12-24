import { Wallet, WalletInfoRemote } from "@tonconnect/ui-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Container } from "../container";
import { DrawerCloseButton } from "../drawer-close-button";

interface Props {
  wallet: WalletInfoRemote & Wallet;
}

export const WalletInfo: React.FC<PropsWithChildren<Props>> = ({
  wallet,
  children,
}) => {
  const t = useTranslations("Settings.walletInfo.infoDrawer");

  console.log(wallet);

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="flex flex-col gap-4 pb-8">
          <DrawerCloseButton />
          <DrawerHeader className="mt-8 flex flex-col items-center gap-3">
            <DrawerTitle>{t("title")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src={wallet.imageUrl}
              width={80}
              height={80}
              className="mb-3 rounded-full"
              alt="wallet logo"
              placeholder="blur"
              blurDataURL="/wallet-placeholder.svg"
            />
            <p className="text-lg">{wallet.name}</p>
            <p>
              {t("link")}{" "}
              <Link
                href={wallet.aboutUrl}
                target="_blank"
                className="text-primary"
              >
                {wallet.appName}
              </Link>
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              {t("version", { version: wallet.device.appVersion })}
            </p>
          </div>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
