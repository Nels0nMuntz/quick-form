import {
  FormQuestionsTypes,
  QuestionComponentProps,
} from "@/entities/question";

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
  ) => {
    const Component = components.get(type);
    return Component ? <Component {...props} key={props.id} /> : null;
  };

  return {
    register,
    buildComponent,
  };
};
