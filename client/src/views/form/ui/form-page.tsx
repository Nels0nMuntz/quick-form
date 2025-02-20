import { fetchPublicFormServer } from "@/entities/form";
import { generateHTML } from "@/shared/lib";
import { Container, FormWrapper, Paper } from "@/shared/ui";
import { Questions } from "./questions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function FormPage({ params }: Props) {
  const { id } = await params;
  const response = await fetchPublicFormServer(id);

  if (!response.ok || !response.data.success) {
    return <div>Something went wrong</div>;
  }

  const config = response.data.data.config;
  const title = generateHTML(config.title);
  const description = config?.description
    ? generateHTML(config.description)
    : "";

  return (
    <div className="py-12 bg-blue-light min-h-[100dvh]">
      <Container>
        <FormWrapper>
          <Paper top>
            <div
              className="flex flex-col gap-y-2"
              dangerouslySetInnerHTML={{ __html: `${title}${description}` }}
            ></div>
          </Paper>
          <Questions questions={config.questions} />
        </FormWrapper>
      </Container>
    </div>
  );
}
