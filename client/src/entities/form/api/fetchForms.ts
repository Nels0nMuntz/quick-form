import { clientFetch } from "@/shared/api";
import { FetchFormsRequest } from "../model/types/fetchFormsRequest";
import { Form } from "../model/types/form";

export const fetchForms = (
  options: FetchFormsRequest,
  signal?: AbortSignal | null,
) => {
  return clientFetch.get<Form[]>("forms", {
    params: options,
    signal,
  });
};
