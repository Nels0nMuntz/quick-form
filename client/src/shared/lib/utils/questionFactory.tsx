import { FormQuestionsTypes } from "@/entities/question";

export const createQuestionFactory = () => {
  const components = new Map();

  const register = (
    type: FormQuestionsTypes,
    component: (props: any) => React.ReactNode,
  ) => {
    components.set(type, component);
  };

  const buildComponent = <T extends Record<string, any>>(
    type: FormQuestionsTypes,
    props: T,
  ) => {
    const Component = components.get(type);
    return Component ? <Component {...props} key={props.id} /> : null;
  };

  return {
    register,
    buildComponent,
  };
};
