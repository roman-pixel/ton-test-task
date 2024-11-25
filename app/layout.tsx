import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

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
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        ></Script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
