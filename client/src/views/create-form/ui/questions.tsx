"use client";
import { QuestionBodyProps, useFormQuestions } from "@/shared/model";
import {
  FormQuestionsTypes,
  PartialFormQuestion,
  QuestionClient,
} from "@/entities/question";
import {
  ChangeQuestionTypeDropdown,
  CopyQuestionButton,
  DeleteQuestionButton,
  RequiredQuestionToggle,
} from "@/features/question";
import { Devider, QuestionsList } from "@/shared/ui";
import {
  ShortTextQuestionBody,
  LongTextQuestionBody,
  CheckboxQuestionBody,
  DropdownQuestionBody,
} from "./question-body";
import { useCallback } from "react";

export const questionBody: Record<
  FormQuestionsTypes,
  React.FC<QuestionBodyProps>
> = {
  "Short text": ShortTextQuestionBody,
  "Long text": LongTextQuestionBody,
  Checkbox: CheckboxQuestionBody,
  Dropdown: DropdownQuestionBody,
};

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
    return (
      <QuestionClient
        id={item.id}
        body={body}
        actions={actions}
        dropdown={dropdown}
      />
    );
  }, []);
  return <QuestionsList items={questions} renderItem={renderItem} />;
}
