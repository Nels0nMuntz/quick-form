import { QuestionAnswer } from "@/entities/response";
import { SummaryProps } from "../../model/types/summaryProps";

export function ShortAnswerSummary({ questionId, responses }: SummaryProps) {
  const answers = responses.reduce(
    (all, { answers }) => {
      const questionAnswer = answers.find(
        (item) => item.questionId === questionId,
      );
      if (questionAnswer && questionAnswer.value) {
        all.push(questionAnswer.value as string);
      }
      return all;
    },
    [] as QuestionAnswer<"Short text">["value"][],
  );
  return (
    <div className="flex flex-col gap-y-1.5">
      {answers.map((answer) => (
        <div className="rounded-sm bg-stone-100 px-2 py-2">{answer}</div>
      ))}
    </div>
  );
}
