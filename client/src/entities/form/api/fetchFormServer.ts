import { serverGet } from "@/shared/api";
import { Form } from "../model/types/form";

export const fetchFormServer = async (id: string) => {
  return await serverGet<Form>("forms", { params: id });
};
