import formRepository from "./form.repository";
import { CurrentUser } from "../user/types/currentUser";
import { CreateFormData } from "./types/createFormData";

const get = async (formId: number) => {
  return await formRepository.findById(formId);
};

const getAll = async (userId: string) => {
  return await formRepository.findByUserId(userId);
};

const create = async (form: CreateFormData, user: CurrentUser) => {
  return await formRepository.create(form, user);
};

export default { get, getAll, create };
