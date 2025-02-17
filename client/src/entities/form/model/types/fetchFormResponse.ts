import { FormConfig } from "@/shared/model";
import { Form } from "./form";

export type FetchFormResponse = Form & {
  config: FormConfig & {
    id: string;
  };
};
