import Image from "next/image";
import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="сursor-pointer relative flex items-center gap-2">
      <Image src="/ton-logo.svg" width={28} height={28} alt="Toncoin logo" />
      <h1 className="text-xl font-semibold">TonLink Test</h1>
      <p className="absolute right-0 top-0 -translate-y-1.5 translate-x-5 rotate-[28deg] text-xs font-semibold text-gray-500 dark:text-gray-400">
        beta
      </p>
    </div>
  );
};
