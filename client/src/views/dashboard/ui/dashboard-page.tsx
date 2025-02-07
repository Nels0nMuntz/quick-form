import Link from "next/link";
import { Header } from "@/widgets/header";
import { SearchInput } from "@/features/form";
import { BaseButton, Container, Icon } from "@/shared/ui";
import { fetchFormsServer } from "@/entities/form";
import { FormsTable } from "./table";

export async function DashboardPage() {
  const response = await fetchFormsServer({
    skip: 0,
    take: 20,
  });

  if (!response.ok || !response.data.success) {
    return <div>Something went wrong</div>;
  }

  const { forms, totalCount } = response.data.data;

  return (
    <div className="pt-12">
      <Container>
        <Header
          title={
            <h1 className="text-2xl font-semibold">
              My Forms {!!forms.length && `(${totalCount})`}
            </h1>
          }
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
        <FormsTable initialData={forms} />
      </Container>
    </div>
  );
}
