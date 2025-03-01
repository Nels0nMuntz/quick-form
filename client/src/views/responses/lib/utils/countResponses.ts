import { FormResponse, QuestionAnswer } from "@/entities/response";

interface Options {
  questionId: string;
  responses: FormResponse[];
}

export const countResponses = ({ questionId, responses }: Options) => {
  return responses.reduce((total, { answers }) => {
    const questionAnswer = answers.find(
      (item) => item.questionId === questionId,
    );
    if (!questionAnswer) return total;
    if (questionAnswer.type === "Checkbox") {
      const values =
        questionAnswer.value as QuestionAnswer<"Checkbox">["value"];
      if (values.length) total += 1;
    } else {
      const value = questionAnswer.value as string;
      if (value) total += 1;
    }
    return total;
  }, 0);
};
