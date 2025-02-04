import { Mapper } from "../../shared";
import { CreateFormData } from "../types/createFormData";

export const createUserDataMapper: Mapper<CreateFormData> = (data) => ({
  name: data.name,
  config: data.config,
  endsAt: data.endsAt,
});
