import { Mapper } from "../../shared";
import { CreateFormData } from "../types/createFormData";

export const createUserDataMapper: Mapper<CreateFormData> = (data) => ({
  config: {
    name: data.config.name,
    title: data.config.title,
    description: data.config.description,
    questions: data.config.questions,
  },
  endsAt: data.endsAt,
});
