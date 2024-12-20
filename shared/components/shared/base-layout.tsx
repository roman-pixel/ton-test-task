/* eslint-disable @next/next/no-before-interactive-script-outside-document */

/* eslint-disable @next/next/no-head-element */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import Script from "next/script";
import React from "react";

import { Providers } from "./providers";

import { cn } from "@/shared/lib/utils";

const inter = Inter({
  subsets: ["cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

interface Props {
  locale: string;
  children: React.ReactNode;
  className?: string;
}

export default async function BaseLayout({
  children,
  locale,
  className,
}: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        ></Script>
      </head>
      <body className={cn(inter.className, className)}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
