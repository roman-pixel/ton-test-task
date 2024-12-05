"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className="сursor-pointer flex items-center gap-2"
      onClick={() => router.push("/")}
    >
      <Image src="/ton-logo.svg" width={30} height={30} alt="Toncoin logo" />
      <h1 className="text-xl font-semibold">TonLink Test</h1>
    </div>
  );
};
