import { serverGet } from "@/shared/api";
import { FetchFormResponse } from "../model/types/fetchFormResponse";

export const fetchPublicFormServer = (slug: string) => {
  return serverGet<FetchFormResponse>("publicForms", { params: slug });
};
