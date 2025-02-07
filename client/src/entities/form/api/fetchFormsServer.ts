import { serverGet } from "@/shared/api";
import { FetchFormsRequest } from "../model/types/fetchFormsRequest";
import { FetchFormsResponse } from "../model/types/fetchFormsResponse";

export const fetchFormsServer = async (options?: FetchFormsRequest) => {
  return await serverGet<FetchFormsResponse>("forms", {
    params: options,
  });
};
