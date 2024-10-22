"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { Button, Input } from "../ui";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const TransferForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isError, setIsError] = useState(false);
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address || !amount) {
      toast.error("Заполните все обязательные поля");
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    const nanoTons = String(Number(amount) * 1000000000);

    const transaction = {
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
      messages: [
        {
          address,
          amount: nanoTons,
        },
      ],
    };

    const result = await tonConnectUI
      .sendTransaction(transaction)
      .then(() => {
        toast.success("Транзакция успешно отправлена");
        router.push("/");
      })
      .catch((err) => {
        toast.error("Транзакция не отправлена");
        console.error(err);
      })
      .finally(() => {
        setAddress("");
        setAmount("");
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 px-3",
        className,
      )}
    >
      <p className="mb-7 text-3xl font-bold">Перевод средств</p>

      <Input
        className={cn({ "border-destructive": isError })}
        placeholder="Адрес кошелька"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        className={cn({ "border-destructive": isError })}
        placeholder="Сумма (TON)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        type="submit"
        className="mt-5 w-1/2 rounded-full dark:shadow-[0_0_30px_5px_hsla(221.2,83.2%,53.3%,0.5)]"
      >
        Отправить
      </Button>
    </form>
  );
};
