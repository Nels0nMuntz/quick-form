import { clientFetch } from "@/shared/api";
import { FetchFormRequest } from "../model/types/fetchFormRequest";

export const fetchForm = (options: FetchFormRequest) => {
  return clientFetch.get("forms", {
    params: options,
  });
};
