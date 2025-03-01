import { FetchFormResponse } from "@/entities/form";
import { FormResponse } from "@/entities/response";
import { Container, TabsContent } from "@/shared/ui";
import { SummaryPaper } from "../summary-paper";
import { countResponses } from "../../lib/utils/countResponses";
import { FormQuestionsTypes } from "@/entities/question";
import { SummaryProps } from "../../model/types/summaryProps";
import { ShortAnswerSummary } from "../summaries/short-answer-summary";
import { LongAnswerSummary } from "../summaries/long-answer-summary";
import { CheckboxAnswerSummary } from "../summaries/checkbox-answer-summary";
import { DropdownAnswerSummary } from "../summaries/drpdown-answer-summary";

interface Props {
  form: FetchFormResponse;
  responses: FormResponse[];
}

const summaries: Record<FormQuestionsTypes, React.FC<SummaryProps>> = {
  "Short text": ShortAnswerSummary,
  "Long text": LongAnswerSummary,
  Checkbox: CheckboxAnswerSummary,
  Dropdown: DropdownAnswerSummary,
};

export default function SummaryTab({ form, responses }: Props) {
  const question = form.config.questions;
  return (
    <TabsContent value="summary" className="mt-0">
      <Container>
        <div className="flex w-full flex-col gap-y-4 py-6">
          {question.map(({ id, title, type }) => {
            const rsponsesCount = countResponses({ questionId: id, responses });
            const Summary = summaries[type];
            return (
              <SummaryPaper
                title={title}
                subtitle={`${rsponsesCount} responses`}
              >
                <Summary questionId={id} responses={responses} />
              </SummaryPaper>
            );
          })}
        </div>
      </Container>
    </TabsContent>
  );
}
