import React from "react";

import { Button } from "../ui";

interface IconButtonProps {
  label?: string;
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      className="flex flex-col items-center gap-2 hover:bg-transparent"
      {...props}
    >
      <div className="rounded-full bg-primary p-[6px]">{icon}</div>
      {label && <span className="text-primary">{label}</span>}
    </Button>
  );
};
