import { Key } from "react";
import { FormQuestionsTypes } from "@/entities/question";

interface QuestionComponentProps {
  id: string;
}

export const createQuestionFactory = () => {
  const components = new Map<
    FormQuestionsTypes,
    React.MemoExoticComponent<
      (props: QuestionComponentProps) => React.JSX.Element
    >
  >();

  const register = (
    type: FormQuestionsTypes,
    component: React.MemoExoticComponent<
      (props: QuestionComponentProps) => React.JSX.Element
    >,
  ) => {
    components.set(type, component);
  };

  const buildComponent = (
    type: FormQuestionsTypes,
    props: QuestionComponentProps,
    key: Key,
  ) => {
    const Component = components.get(type);
    return Component ? <Component {...props} key={key} /> : null;
  };

  return {
    register,
    buildComponent,
  };
};
