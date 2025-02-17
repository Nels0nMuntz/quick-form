import { clientFetch } from "@/shared/api";
import { CreateFormRequest } from "../model/types/createFormRequest";

export const createForm = async (data: CreateFormRequest) => {
  const response = await clientFetch.post("forms", data);
  if (!response.ok && !response.data.success) {
    throw new Error(response.data.error);
  }
  return response.data;
};
