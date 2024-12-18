import { X } from "lucide-react";
import React from "react";

import { Button } from "../ui";

interface Props {
  onClick?: () => void;
}

export const ClearButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-2 top-1/2 -translate-y-1/2"
      onClick={onClick}
    >
      <X />
    </Button>
  );
};
