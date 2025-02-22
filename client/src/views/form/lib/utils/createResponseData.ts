import { SendResponseData } from "@/entities/response";
import { QuestionsFormValues } from "../../model/types/questiosFormvValues";
import { PartialFormQuestion } from "@/entities/question";

interface Options {
  formId: number;
  questions: PartialFormQuestion[];
  values: QuestionsFormValues;
}

export const createFormResponse = ({
  formId,
  values,
  questions,
}: Options): SendResponseData => {
  return {
    formId,
    responses: questions.map(({ id, type }) => ({
      questionId: id,
      type,
      response: values[id],
    })),
  };
};
