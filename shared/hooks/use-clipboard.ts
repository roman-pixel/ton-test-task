import { useTranslations } from "next-intl";
import { useCallback } from "react";

import { useHapticFeedback } from "./use-haptic-feedback";
import { useToast } from "./use-toast";

export const useClipboard = () => {
  const { toast } = useToast();
  const t = useTranslations("CopyToClipboard");
  const triggerFeedback = useHapticFeedback();

  const copyToClipboard = useCallback(
    (text: string) => {
      try {
        navigator.clipboard.writeText(text);
        toast({ title: t("success") });
        triggerFeedback("notification-success");
      } catch (error) {
        toast({ title: t("error"), variant: "destructive" });
        triggerFeedback("notification-error");
        console.error(error);
      }
    },
    [t, toast, triggerFeedback],
  );

  return { copyToClipboard };
};
