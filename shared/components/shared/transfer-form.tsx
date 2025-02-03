"use client";

import { beginCell } from "@ton/ton";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

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

import { TON_MULTIPLIER } from "@/shared/constants";
import { useHapticFeedback, useToast } from "@/shared/hooks";
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
  const t = useTranslations("Wallet.TransactionDrawer");
  const { toast } = useToast();
  const [tonConnectUI] = useTonConnectUI();
  const { data } = useBalanceStore();
  const formattedBalance = Number(data?.result) / TON_MULTIPLIER;
  const triggerFeedback = useHapticFeedback();

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
        title: t("toastMessages.validationError"),
        variant: "destructive",
      });
      setError({
        address: transferData.address ? "" : t("inputLabels.required"),
        amount: transferData.amount ? "" : t("inputLabels.required"),
      });
      triggerFeedback("notification-error");
      return;
    }

    if (!/^\d*\.?\d*$/.test(transferData.amount)) {
      setError({
        ...error,
        amount: t("inputLabels.invalidAmount"),
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
      toast({ title: t("toastMessages.success") });
      setTransferData({ address: "", amount: "", comment: "" });
      triggerFeedback("notification-success");
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: t("toastMessages.transeferError"),
        description: error?.message || "",
        variant: "destructive",
      });
      triggerFeedback("notification-error");
      console.error(error);
    }
  };

  const handleClearButtonClick = (
    setState: React.Dispatch<React.SetStateAction<Transfer>>,
    key: keyof Transfer,
  ) => {
    triggerFeedback("soft");
    setState((prevState) => ({
      ...prevState,
      [key]: "",
    }));
  };

  const handleButtonAllClick = () => {
    triggerFeedback("soft");

    setTransferData((prevState) => ({
      ...prevState,
      amount: String(formattedBalance),
    }));
  };

  return (
    <Drawer open={isOpen} onOpenChange={reset}>
      <DrawerContent>
        <Container className="max-w-md pt-6">
          <DrawerCloseButton className="right-3" />
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl">
              {t("drawerTitle.title")}
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
                  <Input
                    className={cn("h-14 pr-11 text-base", {
                      "border-destructive": error.address,
                    })}
                    placeholder={t("placeholders.address")}
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
                        handleClearButtonClick(setTransferData, "address")
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
                    className={cn("h-14 pr-11 text-base", {
                      "border-destructive": error.amount,
                    })}
                    placeholder={t("placeholders.amount")}
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
                        handleClearButtonClick(setTransferData, "amount")
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
                  variant={
                    transferData.amount === String(formattedBalance)
                      ? "default"
                      : "secondary"
                  }
                  type="button"
                  size="sm"
                  onClick={handleButtonAllClick}
                >
                  {t("transferAll.title", { amount: formattedBalance })}
                </Button>
              </div>

              <div className="relative mt-3">
                <Textarea
                  className="min-h-10 resize-none pr-11 text-base"
                  placeholder={t("placeholders.comment")}
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
                      handleClearButtonClick(setTransferData, "comment")
                    }
                  />
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="dark:shadow-[0_0_30px_5px_hsla(221.2,83.2%,53.3%,0.5)]"
              onClick={() => triggerFeedback("light")}
            >
              {t("sendButton.title")}
            </Button>
          </form>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
