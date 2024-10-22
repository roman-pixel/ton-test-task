"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React, { PropsWithChildren } from "react";

import { Toaster } from "../ui";
import { ThemeProvider } from "./theme-provider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const manifestUrl =
    "https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt";

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          {children}
        </TonConnectUIProvider>

        <Toaster />
      </ThemeProvider>
    </>
  );
};
