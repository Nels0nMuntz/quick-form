"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  FormQuestionsTypes,
  PartialFormQuestion,
  QuestionServer,
} from "@/entities/question";
import { Button, Form as FormWrapper, QuestionsList } from "@/shared/ui";
import {
  ShortTextQuestionBody,
  LongTextQuestionBody,
  CheckboxQuestionBody,
  DropdownQuestionBody,
  QuestionBodyProps,
} from "./question-body";
import { useSendResponseMutation } from "@/features/response";
import { createFormDefaultValues } from "../lib/utils/createFormDefaultValues";
import { createFormResponse } from "../lib/utils/createResponseData";

const quetionBody: Record<FormQuestionsTypes, React.FC<QuestionBodyProps>> = {
  "Long text": LongTextQuestionBody,
  "Short text": ShortTextQuestionBody,
  Checkbox: CheckboxQuestionBody,
  Dropdown: DropdownQuestionBody,
};

interface Props {
  formId: number;
  questions: PartialFormQuestion[];
}

export function Form({ formId, questions }: Props) {
  const form = useForm({
    defaultValues: createFormDefaultValues(questions),
    mode: "onTouched",
  });
  const { isPending, mutate } = useSendResponseMutation();

  const renderQuestion = useCallback((question: PartialFormQuestion) => {
    const BodyComponent = quetionBody[question.type];
    const body = (
      <BodyComponent
        control={form.control}
        question={question}
        setValue={form.setValue}
      />
    );
    return (
      <QuestionServer title={question.title} body={body} key={question.id} />
    );
  }, []);
  const onSubmit = (values: any) => {
    mutate(createFormResponse({ formId, questions, values }));
  };
  const onError = (errors: any) => {
    console.log({ errors, values: form.getValues() });
  };
  return (
    <FormWrapper {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <QuestionsList items={questions} renderItem={renderQuestion} />
        <Button type="submit" loading={isPending}>
          Submit
        </Button>
      </form>
    </FormWrapper>
  );
}
