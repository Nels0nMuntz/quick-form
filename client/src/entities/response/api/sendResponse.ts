import { clientFetch } from "@/shared/api";
import { SendResponseData } from "../model/types/sendResponseData";

export const sendResponse = async (data: SendResponseData) => {
  return clientFetch.post("responses", data);
};
