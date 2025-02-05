import { Mapper } from "../../shared";
import { CreateFormData } from "../types/createFormData";

export const createUserDataMapper: Mapper<CreateFormData> = (data) => ({
  name: data.name,
  config: {
    title: data.config.title,
    description: data.config.description,
    questions: data.config.questions,
  },
  endsAt: data.endsAt,
});
