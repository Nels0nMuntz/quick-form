import Link from "next/link";
import { Header } from "@/widgets/header";
import { SearchInput } from "@/features/form";
import { serverGet } from "@/shared/api";
import { BaseButton, Container, Icon } from "@/shared/ui";
import { FormResponse } from "../model/types/formsResponse";
import { cookies } from "next/headers";

export async function DashboardPage() {
  const requestCookies = await cookies()
  console.log("DASHBOARD_PAGE:cookies:", requestCookies.toString());
  
  const response = await serverGet<FormResponse>("forms");

  if (!response.ok || !response.data.success) {
    return <div>Something went wrong</div>;
  }

  const forms = response.data.data;

  return (
    <div className="pt-12">
      <Container>
        <Header
          title={
            <h1 className="text-2xl font-semibold">
              My Forms {!!forms.length && `(${forms.length})`}
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
      </Container>
    </div>
  );
}
