import { Form } from "./form";
import { FormConfig } from "@/shared/model";

export type FetchFormsResponse = {
  forms: (Form & {
    config: Omit<FormConfig, "questions">;
  })[];
  totalCount: number;
};
