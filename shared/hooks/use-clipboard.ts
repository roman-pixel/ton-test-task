import { useCallback } from "react";

import { useToast } from "./use-toast";

export const useClipboard = () => {
  const { toast } = useToast();

  const copyToClipboard = useCallback(
    (text: string) => {
      try {
        navigator.clipboard.writeText(text);
        toast({ title: "Скопировано в буфер обмена" });
      } catch (error) {
        toast({ title: "Ошибка при копировании", variant: "destructive" });
        console.error(error);
      }
    },
    [toast],
  );

  return { copyToClipboard };
};
