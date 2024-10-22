import type { Metadata } from "next";
import { Suspense } from "react";

import { HeaderBalance } from "@/shared/components/shared";

export const metadata: Metadata = {
  title: "TonLink | Transfer",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Suspense>
        <HeaderBalance />
      </Suspense>
      {children}
    </main>
  );
}
