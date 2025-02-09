import { fetchFormServer } from "@/entities/form";
import { generateHTML } from "@/shared/lib";
import { FormWrapper, Paper } from "@/shared/ui";
import { Questions } from "./questions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function FormPage({ params }: Props) {
  const { id } = await params;
  const response = await fetchFormServer(id);

  if (!response.ok || !response.data.success) {
    return <div>Something went wrong</div>;
  }

  const config = response.data.data.config;
  const title = generateHTML(config.title);
  const description = config?.description
    ? generateHTML(config.description)
    : "";

  return (
    <FormWrapper>
      <Paper top>
        <div
          className="flex flex-col gap-y-2"
          dangerouslySetInnerHTML={{ __html: `${title}${description}` }}
        ></div>
      </Paper>
      <Questions questions={config.questions} />
    </FormWrapper>
  );
}
