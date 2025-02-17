import formRepository from "./form.repository";
import { CurrentUser } from "../user/types/currentUser";
import { GetAllFormData } from "./schemas/getAllSchema";
import { GetByIdData } from "./schemas/getByIdSchema";
import { CreateFormData } from "./schemas/createFormSchema";
import { RemoveData } from "./schemas/removeSchema";
import { GetBySlugData } from "./schemas/getBySlugSchema";
import { UpdateFormData } from "./schemas/updateFormSchema";

const get = async (data: GetByIdData) => {
  const formId = Number(data.id);
  return await formRepository.findById(formId);
};

const getPublic = async (data: GetBySlugData) => {
  return await formRepository.findBySlug(data.slug);
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

const update = async (data: UpdateFormData) => {
  await formRepository.update(data);
  return await formRepository.findById(data.id);
};

const remove = async (data: RemoveData) => {
  return await formRepository.remove(Number(data.id));
};

export default { get, getPublic, getAll, create, update, remove };
