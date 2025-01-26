import Image from "next/image";
import React from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-screen w-screen items-center justify-center",
        className,
      )}
    >
      <div className="animate-pulse-size shadow-pulse bg-ton rounded-full">
        <Image
          src="/ton-logo-without-background.svg"
          width={140}
          height={140}
          alt="Toncoin logo"
        />
      </div>
    </div>
  );
};
