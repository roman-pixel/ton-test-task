import { routing } from "@/i18n/routing";
import BaseLayout from "@/shared/components/shared/base-layout";
import NotFoundPage from "@/shared/components/shared/not-found-page";

export default async function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
