import formRepository from "./form.repository";
import { CurrentUser } from "../user/types/currentUser";
import { GetAllFormData } from "./schemas/getAllSchema";
import { GetByIdData } from "./schemas/getByIdSchema";
import { CreateFormData } from "./schemas/createFormSchema";

const get = async (data: GetByIdData) => {
  const formId = Number(data.id);
  return await formRepository.findById(formId);
};

const getAll = async (userId: string, query: GetAllFormData) => {
  const forms = await formRepository.findMany({
    userId,
    skip: Number(query.skip) || 0,
    take: Number(query.take) || undefined,
    search: query.search || "",
  });
  const totalCount = (await formRepository.findMany({ userId })).length;
  return {
    forms,
    totalCount,
  };
};

const create = async (form: CreateFormData, user: CurrentUser) => {
  return await formRepository.create(form, user);
};

export default { get, getAll, create };
