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
    <DrawerClose asChild className={cn("absolute right-3 top-3", className)}>
      <Button variant="secondary" size="icon" className="rounded-full">
        <X style={{ width: "24px", height: "24px" }} />
      </Button>
    </DrawerClose>
  );
};
