"use client";

import { Address } from "@ton/core";
import React from "react";

import { TON_MULTIPLIER } from "../../constants/ton";
import { Card } from "../card";
import { TransactionDrawer } from "./transaction-drawer";
import { TransactionItem } from "./transaction-item";

import { useHapticFeedback } from "@/shared/hooks";
import { Transaction as TransactionType } from "@/shared/types/transaction-types";

interface Props {
  transaction: TransactionType;
}

export const Transaction: React.FC<Props> = ({ transaction }) => {
  const triggerFeedback = useHapticFeedback();

  const isIncoming = !!transaction.in_msg.source;
  const isError = !transaction.in_msg.source && !transaction.out_msgs.length;

  const comment = transaction.in_msg?.message_content?.decoded?.comment
    ? transaction.in_msg?.message_content?.decoded?.comment
    : transaction.out_msgs[0]?.message_content?.decoded?.comment;

  const getRawAddress = () => {
    if (isError) {
      return transaction?.in_msg?.destination;
    }

    return isIncoming
      ? transaction?.in_msg?.source
      : transaction?.out_msgs?.[0]?.destination;
  };

  const formatedAddress = Address.parse(getRawAddress() || "").toString({
    urlSafe: true,
  });

  const formatTonValue = () => {
    const value =
      Number(
        isIncoming ? transaction.in_msg?.value : transaction.out_msgs[0]?.value,
      ) / TON_MULTIPLIER;

    if (String(value).length > 7) {
      return Number(value.toExponential());
    }

    return value;
  };

  return (
    <TransactionDrawer
      isIncoming={isIncoming}
      address={formatedAddress}
      tonValue={formatTonValue()}
      date={transaction.now}
      comment={comment}
      fee={Number(transaction.total_fees)}
      hash={transaction.hash}
      isError={isError}
    >
      <Card
        className="grid cursor-pointer grid-cols-[auto_1fr_auto] gap-2"
        onClick={() => triggerFeedback("light")}
      >
        <TransactionItem
          isIncoming={isIncoming}
          address={formatedAddress}
          tonValue={formatTonValue()}
          date={transaction.now}
          comment={comment}
          isError={isError}
        />
      </Card>
    </TransactionDrawer>
  );
};
