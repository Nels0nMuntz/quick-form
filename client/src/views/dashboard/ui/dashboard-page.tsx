import Link from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Header } from "@/widgets/header";
import { SearchInput } from "@/features/form";
import { BaseButton, Container, Icon } from "@/shared/ui";
import { fetchFormsServer } from "@/entities/form";
import { FormsTable } from "./table";

export async function DashboardPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  const query = {
    take: 10,
    skip: 0,
  };
  await queryClient.prefetchQuery({
    queryKey: ["forms-data", query],
    queryFn: async () => {
      const respomse = await fetchFormsServer(query);
      if (respomse.ok && respomse.data.success) {
        return respomse.data.data.forms;
      }
      return [];
    },
  });
  const dehydratedState = dehydrate(queryClient);

  const response = await fetchFormsServer({
    skip: 0,
    take: 10,
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
        <HydrationBoundary state={dehydratedState}>
          <FormsTable />
        </HydrationBoundary>
      </Container>
    </div>
  );
}
