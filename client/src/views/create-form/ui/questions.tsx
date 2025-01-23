import { useFormQuestions } from "@/shared/model";
import { ShortTextQuestion } from "@/entities/question";
import { createQuestionFactory } from "../lib/createQuestionFactory";

const questionFactory = createQuestionFactory()
questionFactory.register("Short text", ShortTextQuestion)

export function Questions() {
  const questions = useFormQuestions();
  return (
    questions &&
    questions.map((question) =>
      questionFactory.buildComponent(question.type, question, question.id),
    )
  );
}
