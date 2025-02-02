"use client";
import {
  CheckboxQuestion,
  DropdownQuestion,
  FormQuestionsTypes,
  LongTextQuestion,
  PartialFormQuestion,
  QuestionComponentProps,
  ShortTextQuestion,
} from "@/entities/question";
import { QuestionBodyProps, useFormQuestions } from "@/shared/model";
import { QuestionsList } from "@/shared/ui";
import {
  ShortTextQuestionBody,
  LongTextQuestionBody,
  CheckboxQuestionBody,
  DropdownQuestionBody,
} from "./question-body";
import { createQuestionFactory } from "@/shared/lib";
import { useCallback } from "react";

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
  const renderItem = useCallback((item: PartialFormQuestion) => {
    const BodyComponent = questionBody[item.type];
    const body = <BodyComponent questionId={item.id} />;
    return questionFactory.buildComponent<QuestionComponentProps>(item.type, {
      id: item.id,
      body,
    });
  }, []);
  return <QuestionsList items={questions} renderItem={renderItem} />;
}
