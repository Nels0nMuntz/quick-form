import { useFormQuestions } from "@/shared/model";
import { ShortTextQuestion } from "@/entities/question";
import {
  CopyQuestionButton,
  DeleteQuestionButton,
  RequiredQuestionToggle,
} from "@/features/question";
import { createQuestionFactory } from "../lib/createQuestionFactory";
import { Devider } from "@/shared/ui";

const questionFactory = createQuestionFactory();
questionFactory.register("Short text", ShortTextQuestion);

export function Questions() {
  const questions = useFormQuestions();
  return (
    questions &&
    questions.map((question) => {
      const actions = (
        <>
          <CopyQuestionButton questionId={question.id} />
          <DeleteQuestionButton questionId={question.id} />
          <Devider variant="vertical" />
          <RequiredQuestionToggle questionId={question.id} />
        </>
      );
      const dropdown = <></>;
      return questionFactory.buildComponent(question.type, {
        id: question.id,
        actions,
        dropdown,
      });
    })
  );
}
