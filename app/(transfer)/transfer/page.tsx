import { Container, TransferForm } from "@/shared/components";

export default async function TranfrerPage() {
  return (
    <Container className="flex h-[85vh] flex-col items-center justify-center gap-8">
      <TransferForm />
    </Container>
  );
}
