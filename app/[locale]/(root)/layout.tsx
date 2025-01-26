"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

import { Header, Loader, MenuBar } from "@/shared/components/shared";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wallet = useTonWallet();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (wallet !== undefined) {
      setIsInitialized(true);
    }
  }, [wallet]);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <main className="mb-28 flex flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
      <MenuBar />
    </main>
  );
}
