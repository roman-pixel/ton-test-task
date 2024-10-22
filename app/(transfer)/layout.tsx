import type { Metadata } from "next";

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
      <HeaderBalance />
      {children}
    </main>
  );
}
