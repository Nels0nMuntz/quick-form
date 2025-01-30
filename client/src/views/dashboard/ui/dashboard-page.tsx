import Link from "next/link";
import { Header } from "@/widgets/header";
import { SearchInput } from "@/features/form";
import { BaseButton, Container, Icon } from "@/shared/ui";

export function DashboardPage() {
  return (
    <Container>
      <Header
        title={<h1 className="text-lg">My Forms</h1>}
        action={<SearchInput />}
      />
      <div className="my-12">
        <BaseButton
          asChild
          className="h-auto bg-sky p-8 text-white hover:bg-sky/85"
        >
          <Link href="/form/create">
            <div className="flex items-center gap-x-4">
              <Icon name="new-form" />
              <span className="text-lg">+ New Form</span>
            </div>
          </Link>
        </BaseButton>
      </div>
    </Container>
  );
}
