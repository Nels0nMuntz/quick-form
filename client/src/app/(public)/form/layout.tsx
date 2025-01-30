import { PropsWithChildren } from "react";
import { Container } from "@/shared/ui";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-blue-light">
      <Container>
        <div className="py-12">{children}</div>
      </Container>
    </div>
  );
}
