import { clientFetch } from "@/shared/api";

export const deleteForm = async (id: string) => {
  return clientFetch.deleteRequest("forms", {}, { params: id });
};
