import React, { PropsWithChildren } from "react";

import { Button } from "../../ui";

import { cn } from "@/shared/lib/utils";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  className?: string;
}

export const MenuButton = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<Props>
>(({ label, onClick, disabled, className, children }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn(
        "flex flex-col items-center gap-[2px] font-semibold tracking-wide text-foreground/90 focus-visible:ring-0 focus-visible:ring-offset-0",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <p className="text-[10px]">{label}</p>
    </Button>
  );
});

MenuButton.displayName = "MenuButton";
