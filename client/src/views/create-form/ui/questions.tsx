"use client";
import { QuestionBodyProps, useFormQuestions } from "@/shared/model";
import {
  LongTextQuestion,
  ShortTextQuestion,
  CheckboxQuestion,
  DropdownQuestion,
  QuestionComponentProps,
  FormQuestionsTypes,
  PartialFormQuestion,
} from "@/entities/question";
import {
  ChangeQuestionTypeDropdown,
  CopyQuestionButton,
  DeleteQuestionButton,
  RequiredQuestionToggle,
} from "@/features/question";
import { Devider, QuestionsList } from "@/shared/ui";
import { createQuestionFactory } from "@/shared/lib";
import {
  ShortTextQuestionBody,
  LongTextQuestionBody,
  CheckboxQuestionBody,
  DropdownQuestionBody,
} from "./question-body";
import { useCallback } from "react";

export const questionBody: Record<FormQuestionsTypes, React.FC<QuestionBodyProps>> = {
  "Short text": ShortTextQuestionBody,
  "Long text": LongTextQuestionBody,
  Checkbox: CheckboxQuestionBody,
  Dropdown: DropdownQuestionBody,
};

export const questionFactory = createQuestionFactory();
questionFactory.register("Short text", ShortTextQuestion);
questionFactory.register("Long text", LongTextQuestion);
questionFactory.register("Checkbox", CheckboxQuestion);
questionFactory.register("Dropdown", DropdownQuestion);

export function Questions() {
  const questions = useFormQuestions();
  const renderItem = useCallback((item: PartialFormQuestion) => {
    const actions = (
      <>
        <CopyQuestionButton questionId={item.id} />
        <DeleteQuestionButton questionId={item.id} />
        <Devider variant="vertical" />
        <RequiredQuestionToggle questionId={item.id} />
      </>
    );
    const dropdown = <ChangeQuestionTypeDropdown questionId={item.id} />;
    const BodyComponent = questionBody[item.type];
    const body = <BodyComponent questionId={item.id} />;
    return questionFactory.buildComponent<QuestionComponentProps>(item.type, {
      id: item.id,
      actions,
      dropdown,
      body,
    });
  }, []);
  return <QuestionsList items={questions} renderItem={renderItem} />;
}
