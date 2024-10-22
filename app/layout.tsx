import { Inter } from "next/font/google";

import "./globals.css";

import { ModeToggle } from "@/shared/components";
import { Providers } from "@/shared/components/shared/providers";

const inter = Inter({
  subsets: ["cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ModeToggle />
        </Providers>
      </body>
    </html>
  );
}
