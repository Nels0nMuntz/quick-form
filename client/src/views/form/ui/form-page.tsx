import { fetchPublicFormServer } from "@/entities/form";
import { Container, FormWrapper, Paper } from "@/shared/ui";
import { generateHTML } from "@/shared/lib";
import { Form } from "./form";

interface Props {
  params: Promise<{ id: string }>;
}

export async function FormPage({ params }: Props) {
  const { id } = await params;
  const response = await fetchPublicFormServer(id);

  if (!response.ok || !response.data.success) {
    return <div>Something went wrong</div>;
  }

  const form = response.data.data;
  const config = form.config;
  const title = generateHTML(config.title);
  const description = config?.description
    ? generateHTML(config.description)
    : "";

  return (
    <div className="min-h-[100dvh] bg-blue-light py-12">
      <Container>
        <FormWrapper>
          <Paper top>
            <div
              className="flex flex-col gap-y-2"
              dangerouslySetInnerHTML={{ __html: `${title}${description}` }}
            ></div>
          </Paper>
          <Form formId={Number(form.id)} questions={config.questions} />
        </FormWrapper>
      </Container>
    </div>
  );
}
