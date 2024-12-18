import { useTranslations } from "next-intl";

import { Container, SettingsMenu } from "@/shared/components";

export default function Settings() {
  const t = useTranslations("Settings");

  return (
    <Container className="flex flex-col gap-6">
      <p className="text-2xl font-semibold tracking-wide">{t("title")}</p>
      <SettingsMenu />
    </Container>
  );
}
