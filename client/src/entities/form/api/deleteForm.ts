import { clientFetch } from "@/shared/api";

export const deleteForm = async (id: number) => {
  return clientFetch.deleteRequest("forms", {}, { params: id.toString() });
};
