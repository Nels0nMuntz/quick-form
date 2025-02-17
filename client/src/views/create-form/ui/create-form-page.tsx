import { Header } from "@/widgets/header";
import {
  FormDescription,
  FormName,
  FormTitle,
  PublishFormButton,
} from "@/features/form";
import { Container, Paper } from "@/shared/ui";
import { AddQuestion } from "@/features/question";
import { Questions } from "./questions";
import { Toolbar } from "./toolbar";

export function CreateFormPage() {
  return (
    <>
      <div className="border-b border-gray-200 bg-white pt-12">
        <Container>
          <Header title={<FormName />} action={<PublishFormButton />} />
          <Toolbar />
        </Container>
      </div>
      <div className="flex-grow bg-blue-light py-8">
        <Container>
          <div className="flex flex-col gap-y-4">
            <Paper top>
              <div className="flex flex-col gap-y-2">
                <FormTitle />
                <FormDescription />
              </div>
            </Paper>
            <Questions />
            <AddQuestion />
          </div>
        </Container>
      </div>
    </>
  );
}
