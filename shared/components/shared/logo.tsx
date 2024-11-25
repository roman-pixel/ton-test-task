import Image from "next/image";
import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Image src="/ton-logo.svg" width={30} height={30} alt="Toncoin logo" />
      <h1 className="text-lg font-medium">TonLink Test</h1>
    </div>
  );
};
