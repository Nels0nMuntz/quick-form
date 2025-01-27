"use client";
import { useFormQuestions } from "@/shared/model";
import {
  LongTextQuestion,
  ShortTextQuestion,
  CheckboxQuestion,
  DropdownQuestion,
  QuestionComponentProps,
  FormQuestionsTypes,
} from "@/entities/question";
import {
  ChangeQuestionTypeDropdown,
  CopyQuestionButton,
  DeleteQuestionButton,
  RequiredQuestionToggle,
} from "@/features/question";
import { Devider } from "@/shared/ui";
import { createQuestionFactory } from "../lib/createQuestionFactory";
import {
  ShortTextQuestionBody,
  LongTextQuestionBody,
  CheckboxQuestionBody,
  DropdownQuestionBody,
  QuestionBodyProps,
} from "./question-body";

const questionBody: Record<FormQuestionsTypes, React.FC<QuestionBodyProps>> = {
  "Short text": ShortTextQuestionBody,
  "Long text": LongTextQuestionBody,
  Checkbox: CheckboxQuestionBody,
  Dropdown: DropdownQuestionBody,
};

const questionFactory = createQuestionFactory();
questionFactory.register("Short text", ShortTextQuestion);
questionFactory.register("Long text", LongTextQuestion);
questionFactory.register("Checkbox", CheckboxQuestion);
questionFactory.register("Dropdown", DropdownQuestion);

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
      const dropdown = <ChangeQuestionTypeDropdown questionId={question.id} />;
      const BodyComponent = questionBody[question.type];
      const body = <BodyComponent questionId={question.id} />;
      return questionFactory.buildComponent(question.type, {
        id: question.id,
        actions,
        dropdown,
        body,
      });
    })
  );
}
