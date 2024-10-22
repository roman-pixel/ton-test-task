"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Container, TransferForm } from "@/shared/components";

export default function TranfrerPage() {
  const router = useRouter();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (!tonConnectUI?.account) {
      router.replace("/");
    }
  }, [router, tonConnectUI?.account]);

  return (
    <Container className="flex h-[85vh] flex-col items-center justify-center gap-8">
      <TransferForm />
    </Container>
  );
}
