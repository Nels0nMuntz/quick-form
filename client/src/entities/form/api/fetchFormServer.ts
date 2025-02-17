import { serverGet } from "@/shared/api";
import { FetchFormResponse } from "../model/types/fetchFormResponse";

export const fetchFormServer = async (id: string) => {
  return await serverGet<FetchFormResponse>("forms", { params: id });
};
