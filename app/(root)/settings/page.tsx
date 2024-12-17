import { Container, SettingsMenu } from "@/shared/components";

export default function Settings() {
  return (
    <Container className="flex flex-col gap-6">
      <p className="text-2xl font-semibold tracking-wide">Настройки</p>
      <SettingsMenu />
    </Container>
  );
}
