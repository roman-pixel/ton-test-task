import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";

import { routing } from "@/i18n/routing";
import BaseLayout from "@/shared/components/shared/base-layout";

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<LayoutProps, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: LayoutProps) {
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
