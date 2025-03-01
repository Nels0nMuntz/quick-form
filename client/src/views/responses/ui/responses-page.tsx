import { fetchFormServer } from "@/entities/form";
import {
  Container,
  Paper,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import Toolbar from "./toolbar";
import { Header } from "@/widgets/header";
import { fetchResponseServer } from "@/entities/response";
import SummaryTab from "./tabs/summary-tab";

interface Props {
  params: Promise<{ id: string }>;
}

export async function ResponsesPage({ params }: Props) {
  const id = (await params).id;

  const [formResult, reponsesResult] = await Promise.all([
    fetchFormServer(id),
    fetchResponseServer(id),
  ]);

  if (
    !formResult.ok ||
    !formResult.data.success ||
    !reponsesResult.ok ||
    !reponsesResult.data.success
  ) {
    return <div>Something went wrong</div>;
  }

  const form = formResult.data.data;
  const responses = reponsesResult.data.data;

  return (
    <Tabs defaultValue="summary">
      <div className="gborder-b border-gray-200 bg-white pb-4 pt-12">
        <Container>
          <div className="flex flex-col gap-y-1">
            <Header
              title={<h1 className="text-2xl font-semibold">{form.name}</h1>}
              action={<Toolbar formId={form.id} slug={form.slug} />}
            />
            <div>
              {responses.length} response{responses.length > 1 ? "s" : ""}
            </div>
          </div>
          <TabsList className="mt-6 grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
          </TabsList>
        </Container>
      </div>
      <SummaryTab form={form} responses={responses} />
      <TabsContent value="questions" className="mt-0">
        <Container>
          <Paper>
            <div>questions</div>
          </Paper>
        </Container>
      </TabsContent>
      <TabsContent value="individual" className="mt-0">
        <Container>
          <Paper>
            <div>Individual</div>
          </Paper>
        </Container>
      </TabsContent>
    </Tabs>
  );
}
