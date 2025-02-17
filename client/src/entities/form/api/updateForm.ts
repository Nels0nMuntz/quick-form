import { clientFetch } from "@/shared/api";
import { UpdateFormRequest } from "../model/types/updateFormRequest";
import { Form } from "../model/types/form";

export const updateForm = async (data: UpdateFormRequest) => {
  const response = await clientFetch.put<Form>("forms", data);
  if (response.ok && response.data.success) {
    return response.data.data;
  }
  if (!response.data.success) {
    throw new Error(response.data.error);
  }
  throw new Error("Failed to update form");
};
