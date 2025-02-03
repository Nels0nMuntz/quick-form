"use client";
import {
  FormQuestionsTypes,
  PartialFormQuestion,
  QuestionServer,
} from "@/entities/question";
import { Button, Form, QuestionsList } from "@/shared/ui";
import { useForm } from "react-hook-form";
import {
  ShortTextQuestionBody,
  LongTextQuestionBody,
  CheckboxQuestionBody,
  DropdownQuestionBody,
  QuestionBodyProps,
} from "./question-body";
import { useCallback } from "react";

const quetionBody: Record<FormQuestionsTypes, React.FC<QuestionBodyProps>> = {
  "Long text": LongTextQuestionBody,
  "Short text": ShortTextQuestionBody,
  Checkbox: CheckboxQuestionBody,
  Dropdown: DropdownQuestionBody,
};

export type QuestionsForm = Record<string, any>;

interface Props {
  questions: PartialFormQuestion[];
}

export function Questions({ questions }: Props) {
  const defaultValues = questions.reduce<QuestionsForm>((all, curr) => {
    if (curr.type === "Checkbox" && curr.options) {
      all[curr.id] = curr.options.map((item) => ({ ...item, checked: false }));
    } else {
      all[curr.id] = "";
    }
    return all;
  }, {});
  const form = useForm({
    defaultValues,
  });
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
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <QuestionsList items={questions} renderItem={renderQuestion} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
