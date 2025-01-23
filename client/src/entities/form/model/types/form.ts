import { FormConfig } from "@/shared/model";

export interface Form {
  id: string;
  name: string;
  config: FormConfig;
  createdAt: string;
  updatedAt: string;
  endsAt: string;
}
