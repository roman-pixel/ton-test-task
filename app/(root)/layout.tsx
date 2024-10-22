import type { Metadata } from "next";

import { Header, ModeToggle } from "@/shared/components/shared";

// import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "TonLink | Main",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
