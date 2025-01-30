import { FormDescription, FormTitle } from "@/features/form";
import { Container, Paper } from "@/shared/ui";
import { BackButton } from "./back-button";

export function PreviewFormPage() {
  return (
    <>
      <div className="py-8">
        <Container>
          <BackButton />
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
            {/* <Questions /> */}
          </div>
        </Container>
      </div>
    </>
  );
}
