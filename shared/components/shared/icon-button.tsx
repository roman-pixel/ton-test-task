import React from "react";

import { Button } from "../ui";

interface IconButtonProps {
  label?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, icon, onClick, disabled }, ref) => {
    return (
      <Button
        ref={ref} // Передача `ref` в кнопку
        variant="ghost"
        className="flex flex-col items-center gap-2 hover:bg-transparent"
        onClick={onClick}
        disabled={disabled}
      >
        <div className="rounded-full bg-primary p-[6px]">{icon}</div>
        {label && <span className="text-primary">{label}</span>}
      </Button>
    );
  },
);

// Установим имя для компонента для отладки
IconButton.displayName = "IconButton";
