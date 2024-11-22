import { Copy } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";

import { Button } from "../ui";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Container } from "./container";

import { useClipboard } from "@/shared/hooks/use-clipboard";

interface QrCodeProps {
  address: string | undefined;
}

export const QrCode: React.FC<React.PropsWithChildren<QrCodeProps>> = ({
  address,
  children,
}) => {
  const { copyToClipboard } = useClipboard();

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container>
          <DrawerHeader className="mt-3 flex flex-col items-center gap-3">
            <DrawerTitle>Получить Toncoin</DrawerTitle>
            <DrawerDescription className="text-center">
              Отправляйте на этот адрес только Toncoin TON и токены в сети TON,
              иначе вы можете потерять свои средства
            </DrawerDescription>
          </DrawerHeader>
          <div className="mx-4 flex flex-col items-center gap-4 rounded-lg bg-white p-5">
            <QRCodeCanvas
              value={address || ""}
              size={270}
              level="Q"
              imageSettings={{
                src: "/ton-logo.svg",
                height: 50,
                width: 50,
                excavate: true,
              }}
            />
            <p className="break-all text-center text-sm text-black">
              {address}
            </p>
          </div>
          <DrawerFooter className="gap-4">
            <Button onClick={() => copyToClipboard(address || "")}>
              <Copy />
              <span>Скопировать</span>
            </Button>
            <DrawerClose>
              <Button className="w-full" variant="outline" size="sm">
                Закрыть
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
