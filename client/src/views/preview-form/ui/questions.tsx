"use client";
import {
  FormQuestionsTypes,
  PartialFormQuestion,
  QuestionClient,
} from "@/entities/question";
import { QuestionBodyProps, useFormQuestions } from "@/shared/model";
import { QuestionsList } from "@/shared/ui";
import {
  ShortTextQuestionBody,
  LongTextQuestionBody,
  CheckboxQuestionBody,
  DropdownQuestionBody,
} from "./question-body";
import { useCallback } from "react";

const questionBody: Record<FormQuestionsTypes, React.FC<QuestionBodyProps>> = {
  "Short text": ShortTextQuestionBody,
  "Long text": LongTextQuestionBody,
  Checkbox: CheckboxQuestionBody,
  Dropdown: DropdownQuestionBody,
};

export function Questions() {
  const questions = useFormQuestions();
  const renderItem = useCallback((item: PartialFormQuestion) => {
    const BodyComponent = questionBody[item.type];
    const body = <BodyComponent questionId={item.id} />;
    return <QuestionClient id={item.id} body={body} key={item.id}/>;
  }, []);
  return <QuestionsList items={questions} renderItem={renderItem} />;
}
