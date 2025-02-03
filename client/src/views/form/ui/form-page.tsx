import { Form } from "@/entities/form";
import { serverGet } from "@/shared/api";
import { generateHTML } from "@/shared/lib";
import { FormWrapper, Paper } from "@/shared/ui";
import { Questions } from "./questions";

export async function FormPage() {
  const response = await serverGet<Form>("form");

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
      <Questions questions={config.questions}/>
    </FormWrapper>
  );
}
