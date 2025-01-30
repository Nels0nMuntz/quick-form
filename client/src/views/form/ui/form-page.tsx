import { Form } from "@/entities/form";
import { serverGet } from "@/shared/api";
import { generateHTML } from "@/shared/lib";
import { FormWrapper, Paper } from "@/shared/ui";

export async function FormPage() {
  const response = await serverGet<Form>("form");
  console.log({ response });

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
      {/* <Questions /> */}
    </FormWrapper>
  );
}
