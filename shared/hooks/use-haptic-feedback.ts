import { useCallback } from "react";

type HapticFeedbackType =
  | "light"
  | "medium"
  | "heavy"
  | "rigid"
  | "soft"
  | "selection"
  | "notification-success"
  | "notification-warning"
  | "notification-error";

export const useHapticFeedback = () => {
  const triggerFeedback = useCallback((type: HapticFeedbackType) => {
    const haptic = window?.Telegram?.WebApp?.HapticFeedback;

    if (haptic) {
      switch (type) {
        case "light":
        case "medium":
        case "heavy":
        case "rigid":
        case "soft":
          haptic.impactOccurred(type);
          break;
        case "selection":
          haptic.selectionChanged();
          break;
        case "notification-success":
          haptic.notificationOccurred("success");
          break;
        case "notification-warning":
          haptic.notificationOccurred("warning");
          break;
        case "notification-error":
          haptic.notificationOccurred("error");
          break;
        default:
          console.warn(`Unsupported haptic feedback type: ${type}`);
      }
    } else {
      console.warn(
        "Haptic feedback is not supported on this device or environment.",
      );
    }
  }, []);

  return triggerFeedback;
};
