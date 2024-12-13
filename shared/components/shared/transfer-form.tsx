"use client";

import { beginCell } from "@ton/ton";
import { useTonConnectUI } from "@tonconnect/ui-react";
import React, { useState } from "react";

import { TON_MULTIPLIER } from "../constants/ton";
import { Button, Input, Textarea } from "../ui";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { ClearButton } from "./clear-button";
import { Container } from "./container";
import { DrawerCloseButton } from "./drawer-close-button";

import { useToast } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { useBalanceStore } from "@/shared/store/balance";

type Transfer = {
  address: string;
  amount: string;
  comment?: string;
};

type InputError = {
  address?: string;
  amount?: string;
};

interface TransferFormProps {
  isOpen: boolean;
  onclose: () => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({
  isOpen,
  onclose,
}) => {
  const { toast } = useToast();
  const [tonConnectUI] = useTonConnectUI();
  const { data } = useBalanceStore();
  const formattedBalance = Number(data?.balance) / TON_MULTIPLIER;

  const [transferData, setTransferData] = useState<Transfer>({
    address: "",
    amount: "",
    comment: "",
  });
  const [error, setError] = useState<InputError>({
    address: "",
    amount: "",
  });

  const reset = () => {
    setTransferData({
      address: "",
      amount: "",
      comment: "",
    });
    setError({
      address: "",
      amount: "",
    });
    onclose();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({
      address: "",
      amount: "",
    });

    if (!transferData.address || !transferData.amount) {
      toast({
        title: "Заполните все обязательные поля",
        variant: "destructive",
      });
      setError({
        address: transferData.address ? "" : "Обязательное поле",
        amount: transferData.amount ? "" : "Обязательное поле",
      });
      return;
    }

    if (!/^\d*\.?\d*$/.test(transferData.amount)) {
      setError({
        ...error,
        amount: "Введите корректное число",
      });
      return;
    }

    const nanoTons = String(Number(transferData.amount) * 1000000000);

    const body = beginCell()
      .storeUint(0, 32) // Write 32 zero bits to indicate a text comment will follow
      .storeStringTail(transferData.comment || "") // Write the text comment
      .endCell();

    const transaction = {
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
      messages: [
        {
          address: transferData.address,
          amount: nanoTons,
          payload: body.toBoc().toString("base64"),
        },
      ],
    };

    try {
      await tonConnectUI.sendTransaction(transaction);
      toast({ title: "Транзакция успешно отправлена" });
      setTransferData({ address: "", amount: "", comment: "" });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Ошибка при отправке транзакции",
        description: error?.message || "",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={reset}>
      <DrawerContent>
        <Container className="max-w-md py-6">
          <DrawerCloseButton />
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl">
              Перевод средств
            </DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          <form
            onSubmit={onSubmit}
            className="mt-4 flex h-[60vh] flex-col justify-between gap-4 px-4"
          >
            <div className="flex flex-col gap-4">
              <div>
                <div className="relative">
                  <Textarea
                    className={cn("min-h-10 resize-none text-base", {
                      "border-destructive": error.address,
                    })}
                    placeholder="Адрес кошелька"
                    value={transferData.address}
                    onChange={(e) =>
                      setTransferData({
                        ...transferData,
                        address: e.target.value,
                      })
                    }
                  />

                  {transferData.address && (
                    <ClearButton
                      onClick={() =>
                        setTransferData({ ...transferData, address: "" })
                      }
                    />
                  )}
                </div>
                {error.address && (
                  <p className="mt-1 text-sm text-destructive">
                    {error.address}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    className={cn("h-14 text-base", {
                      "border-destructive": error.amount,
                    })}
                    placeholder="Сумма (TON)"
                    value={transferData.amount}
                    onChange={(e) =>
                      setTransferData({
                        ...transferData,
                        amount: e.target.value,
                      })
                    }
                  />

                  {transferData.amount && (
                    <ClearButton
                      onClick={() =>
                        setTransferData({ ...transferData, amount: "" })
                      }
                    />
                  )}
                </div>
                {error.amount && (
                  <p className="mt-1 text-sm text-destructive">
                    {error.amount}
                  </p>
                )}
                <Button
                  className="mt-3 h-8 text-xs opacity-85"
                  variant="secondary"
                  type="button"
                  size="sm"
                  onClick={() =>
                    setTransferData({
                      ...transferData,
                      amount: String(formattedBalance),
                    })
                  }
                >
                  Все {formattedBalance}
                  <span className="uppercase">Ton</span>
                </Button>
              </div>

              <div className="relative mt-3">
                <Textarea
                  className="min-h-10 resize-none text-base"
                  placeholder="Комментарий"
                  value={transferData.comment}
                  onChange={(e) =>
                    setTransferData({
                      ...transferData,
                      comment: e.target.value,
                    })
                  }
                />
                {transferData.comment && (
                  <ClearButton
                    onClick={() =>
                      setTransferData({ ...transferData, comment: "" })
                    }
                  />
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="dark:shadow-[0_0_30px_5px_hsla(221.2,83.2%,53.3%,0.5)]"
            >
              Отправить
            </Button>
          </form>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
