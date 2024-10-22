import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button, Container, TransferForm } from "@/shared/components";

export default async function TranfrerPage() {
  return (
    <Container className="flex h-[80vh] flex-col items-center justify-center gap-8">
      <TransferForm />
    </Container>
  );
}
