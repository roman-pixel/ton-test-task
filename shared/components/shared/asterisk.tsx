import { Asterisk as AsteriskIcon } from "lucide-react";
import React from "react";

interface Props {
  count: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const Asterisk: React.FC<Props> = ({
  count,
  strokeWidth = 2,
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <AsteriskIcon
          key={index}
          strokeWidth={strokeWidth}
          className={className}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      ))}
    </>
  );
};
