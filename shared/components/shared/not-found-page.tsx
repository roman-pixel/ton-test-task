"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "../ui";
import { Container } from "./container";

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslations("NotFound");

  return (
    <Container className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl lowercase tracking-wide text-foreground">
            <span className="mr-2 font-semibold text-primary">404</span>
            {t("title")}
          </p>
          <p className="text-center">{t("description")}</p>
        </div>

        <Button
          variant="secondary"
          className="text-primary"
          size="lg"
          onClick={() => router.replace("/")}
        >
          {t("backButton")}
        </Button>
      </div>
    </Container>
  );
}
