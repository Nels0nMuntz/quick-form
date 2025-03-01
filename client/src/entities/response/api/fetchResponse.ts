import { serverGet } from "@/shared/api";
import { FormResponse } from "../model/types/formResponse";

export const fetchResponseServer = (formId: string) => {
  return serverGet<FormResponse[]>("responses", { params: formId });
};
