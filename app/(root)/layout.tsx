import type { Metadata } from "next";

import { Header, MenuBar } from "@/shared/components/shared";

export const metadata: Metadata = {
  title: "TonLink",
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
      <MenuBar />
    </main>
  );
}
