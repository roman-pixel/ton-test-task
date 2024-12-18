import { useTranslations } from "next-intl";
import { useCallback } from "react";

import { useToast } from "./use-toast";

export const useClipboard = () => {
  const { toast } = useToast();
  const t = useTranslations("CopyToClipboard");

  const copyToClipboard = useCallback(
    (text: string) => {
      try {
        navigator.clipboard.writeText(text);
        toast({ title: t("success") });
      } catch (error) {
        toast({ title: t("error"), variant: "destructive" });
        console.error(error);
      }
    },
    [t, toast],
  );

  return { copyToClipboard };
};
