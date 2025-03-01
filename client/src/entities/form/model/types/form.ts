import { FormConfig } from "@/shared/model";

export interface Form {
  id: number;
  name: string;
  config: FormConfig;
  createdAt: string;
  updatedAt: string;
  endsAt: string | null;
}
