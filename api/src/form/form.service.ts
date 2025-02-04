import formRepository from "./form.repository";
import { CurrentUser } from "../user/types/currentUser";
import { CreateFormData } from "./types/createFormData";

const get = async (formId: number) => {
  return await formRepository.findById(formId);
};

const create = async (form: CreateFormData, user: CurrentUser) => {
  return await formRepository.create(form, user);
};

export default { get, create };
