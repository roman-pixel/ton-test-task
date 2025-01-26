"use client";

import { X } from "lucide-react";
import React from "react";

import { Button } from "../ui";
import { DrawerClose } from "../ui/drawer";

import { cn } from "@/shared/lib";

interface Props {
  className?: string;
}

export const DrawerCloseButton: React.FC<Props> = ({ className }) => {
  return (
    <DrawerClose asChild className={cn("absolute right-0 top-3", className)}>
      <Button
        variant="secondary"
        size="icon"
        className="bg-utility rounded-full"
      >
        <X style={{ width: "20px", height: "20px" }} />
      </Button>
    </DrawerClose>
  );
};
