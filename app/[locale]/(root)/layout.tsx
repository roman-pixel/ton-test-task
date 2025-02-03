"use client";

import { useTonWallet } from "@tonconnect/ui-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Header, Loader, MenuBar } from "@/shared/components/shared";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wallet = useTonWallet();
  const [isInitialized, setIsInitialized] = useState(false);
  const { resolvedTheme } = useTheme();

  const tg = window?.Telegram?.WebApp;

  useEffect(() => {
    if (!tg) return;

    tg.ready();

    // TODO: get color from css
    tg.setBackgroundColor(resolvedTheme === "dark" ? "#020817" : "#f0f0f5");
    tg.setHeaderColor(resolvedTheme === "dark" ? "#020817" : "#f0f0f5");
  }, [resolvedTheme, tg]);

  useEffect(() => {
    if (wallet !== undefined) {
      setIsInitialized(true);
    }
  }, [wallet]);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
      <MenuBar />
    </main>
  );
}
