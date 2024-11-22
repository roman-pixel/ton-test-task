import { useCallback } from "react";

import { useToast } from "./use-toast";

export const useClipboard = () => {
  const { toast } = useToast();

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast({ title: "Скопировано в буфер обмена" });
        })
        .catch((err) => {
          toast({ title: "Ошибка при копировании", variant: "destructive" });
          console.error(err);
        });
    },
    [toast],
  );

  return { copyToClipboard };
};
