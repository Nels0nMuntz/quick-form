import { Form } from "@/entities/form";
import { FormConfig } from "@/shared/model";

export type FormResponse = Form & {
  config: Omit<FormConfig, "questions">;
}[];
