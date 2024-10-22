import type { Metadata } from "next";

import { Header } from "@/shared/components/shared";

export const metadata: Metadata = {
  title: "TonLink | Main",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
