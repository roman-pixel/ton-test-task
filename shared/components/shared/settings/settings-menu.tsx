"use client";

import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { CircleHelp, LogOut } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Card } from "../card";
import { LangSettings } from "./lang-settings";
import { ThemeSettings } from "./theme-settings";
import { WalletDisconnect } from "./wallet-disconnect";

import { useHapticFeedback } from "@/shared/hooks";
import { cn } from "@/shared/lib";

interface Props {
  className?: string;
}

export const SettingsMenu: React.FC<Props> = ({ className }) => {
  const t = useTranslations("Settings");
  const router = useRouter();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { theme } = useTheme();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const triggerFeedback = useHapticFeedback();

  useEffect(() => {
    if (locale || theme) {
      setIsLoading(false);
    }
  }, [locale, theme]);

  const handleLogoutClick = () => {
    triggerFeedback("light");
    router.replace(`/${locale}`);
    tonConnectUI.disconnect();
  };

  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <div className="flex flex-col gap-5">
        {!isLoading && (
          <Card className="flex flex-col gap-4 divide-y divide-foreground/10">
            <ThemeSettings>
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => triggerFeedback("light")}
              >
                <span>{t("theme.title")}</span>
                <span className="text-primary/90">
                  {t(`theme.type.${theme}`)}
                </span>
              </div>
            </ThemeSettings>

            <LangSettings>
              <div
                className={cn(
                  "flex cursor-pointer items-center justify-between",
                  { "pt-4": theme },
                )}
                onClick={() => triggerFeedback("light")}
              >
                <span>{t("language.title")}</span>
                <span className="text-primary/90">
                  {t(`language.type.${locale}`)}
                </span>
              </div>
            </LangSettings>
          </Card>
        )}

        <Card className="flex flex-col gap-4 divide-y divide-foreground/10">
          {/* TODO: Add support and change div to Link */}
          <div
            // href="https://t.me/ton_link_test_bot"
            // target="_blank"
            className="flex items-center justify-between"
            // onClick={() => triggerFeedback("light")}
          >
            <span className="text-foreground/40">{t("support.title")}</span>
            <CircleHelp
              style={{ width: "22px", height: "22px" }}
              strokeWidth={2.3}
              className="stroke-primary/40"
            />
          </div>

          <Link
            href="https://github.com/roman-pixel/ton-test-task"
            target="_blank"
            className="flex items-center justify-between pt-4"
            onClick={() => triggerFeedback("light")}
          >
            <span>{t("github.title")}</span>
            <svg
              role="img"
              style={{ width: "22px", height: "22px" }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary/90"
            >
              <title>Refined GitHub</title>
              <path d="M18.906.614a3.4 3.4 0 0 0-.896.127c-.955.262-1.824.76-2.646 1.302a13.7 13.7 0 0 0-6.807-.002A11 11 0 0 0 6.71 1.016C6.136.78 5.526.585 4.899.622c-.113.01-.263.013-.315.135a5.8 5.8 0 0 0-.422 1.737 4.8 4.8 0 0 0 .223 1.923 5.4 5.4 0 0 0-1.36 3.053c-.05.453-.036.91-.015 1.365-.934-.237-1.93-.278-2.867-.035-.11.025-.174.16-.128.261.036.092.146.14.238.111.912-.232 1.881-.177 2.783.074q.045.412.107.821c-.798-.196-1.635-.093-2.42.11-.14.033-.18.238-.071.328.083.08.205.04.303.015.74-.18 1.536-.258 2.275-.027.072.248.13.5.226.741l.316.715c.321.63.806 1.167 1.365 1.596a6.8 6.8 0 0 0 1.73.942c.727.277 1.49.449 2.258.571a3.3 3.3 0 0 0-.376.498 3.2 3.2 0 0 0-.335.795c-.43.007-.865.05-1.288-.045a1.95 1.95 0 0 1-.864-.452 3.6 3.6 0 0 1-.62-.739 1 1 0 0 0-.618-.43.73.73 0 0 0-.57.11.67.67 0 0 0-.256.406c-.051.221-.011.452.059.665.122.365.351.687.626.954.485.467 1.089.799 1.726 1.006.535.17 1.112.257 1.667.143-.003.99.003 1.979-.003 2.968-.024.232-.134.45-.28.628-.1.128-.23.231-.377.301-.128.056-.268.102-.362.212a.43.43 0 0 0-.097.422.41.41 0 0 0 .265.25c.148.05.306.039.46.036.45-.013.907-.1 1.306-.318.55-.294.95-.897.925-1.532-.002-.679-.022-1.357-.032-2.036-.003-.385-.018-.771.016-1.155.028 1.009.034 2.019.054 3.028.002.324-.001.654-.09.97a1.8 1.8 0 0 1-.365.682c-.098.12-.226.22-.295.362-.06.114-.07.26.001.37.084.143.254.197.409.22.33.041.657-.073.95-.218a2.16 2.16 0 0 0 .86-.783c.209-.338.308-.736.316-1.13.01-.584.008-1.167.017-1.75.035-.297.021-.596.028-.894.005.175.003.35.004.525-.027.534-.003 1.07-.004 1.604.01.31-.013.624.049.93.062.324.195.636.398.897.234.3.551.53.902.678.294.123.63.204.943.105.156-.044.296-.18.3-.35.003-.169-.105-.312-.22-.427a1.87 1.87 0 0 1-.524-1.36V18.47c.004-.27-.012-.54.014-.809.049.405.034.814.033 1.22.004.733-.003 1.466.004 2.2.015.41.18.822.48 1.108.346.337.824.5 1.295.565q.36.05.719.026c.182-.016.37-.137.408-.324.039-.176-.059-.355-.2-.457-.093-.075-.215-.095-.318-.153-.292-.16-.5-.451-.588-.77-.045-.138-.022-.284-.028-.426.001-.89-.007-1.782.008-2.672.483.097.983.043 1.455-.084a4.6 4.6 0 0 0 1.794-.94c.334-.29.618-.651.761-1.073.068-.205.11-.426.068-.641a.7.7 0 0 0-.233-.414.72.72 0 0 0-.583-.137 1 1 0 0 0-.632.431c-.206.314-.445.612-.744.841a1.9 1.9 0 0 1-.718.346c-.43.103-.876.059-1.314.051a3.9 3.9 0 0 0-.72-1.269c-.032-.022.018-.042.036-.041 1.228-.18 2.453-.528 3.514-1.188a5.15 5.15 0 0 0 1.638-1.593 3 3 0 0 0 .21-.383c.096-.214.203-.423.285-.644a8 8 0 0 0 .218-.725c.661-.228 1.38-.193 2.057-.057q.187.037.375.084c.07.017.154.017.21-.036.104-.084.073-.278-.054-.323-.81-.218-1.677-.314-2.5-.104a9 9 0 0 0 .109-.792c0-.031.038-.032.06-.041.903-.252 1.874-.306 2.788-.073.12.038.227-.057.263-.165v-.037c-.031-.073-.074-.156-.16-.173-.956-.246-1.971-.197-2.92.052.038-.68.033-1.37-.125-2.037a5.5 5.5 0 0 0-1.251-2.399c.386-1.133.283-2.39-.134-3.499-.04-.105-.07-.249-.204-.27q-.15-.03-.3-.032" />
            </svg>
          </Link>
        </Card>

        {wallet && (
          <WalletDisconnect onClick={handleLogoutClick}>
            <Card
              className="flex w-full cursor-pointer items-center justify-between py-4 text-base text-destructive dark:text-red-500"
              onClick={() => triggerFeedback("heavy")}
            >
              <span>{t("logout.title")}</span>
              <LogOut
                style={{ width: "18px", height: "18px" }}
                strokeWidth={2.3}
                className="stroke-destructive/90 dark:stroke-red-500/90"
              />
            </Card>
          </WalletDisconnect>
        )}
      </div>

      <div className="text-center text-sm opacity-80">
        TonLink Test by{" "}
        <Link
          href="https://github.com/roman-pixel"
          target="_blank"
          className="text-primary"
          onClick={() => triggerFeedback("light")}
        >
          roman-pixel
        </Link>
      </div>
    </div>
  );
};
