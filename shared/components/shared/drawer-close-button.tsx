"use client";

import { X } from "lucide-react";
import React from "react";

import { Button } from "../ui";
import { DrawerClose } from "../ui/drawer";

import { useHapticFeedback } from "@/shared/hooks";
import { cn } from "@/shared/lib";

interface Props {
  className?: string;
}

export const DrawerCloseButton: React.FC<Props> = ({ className }) => {
  const triggerFeedback = useHapticFeedback();

  return (
    <DrawerClose asChild className={cn("absolute right-3 top-3", className)}>
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={() => triggerFeedback("soft")}
      >
        <X style={{ width: "20px", height: "20px" }} />
      </Button>
    </DrawerClose>
  );
};
