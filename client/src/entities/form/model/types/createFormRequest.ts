import { FormConfig } from "@/shared/model";

export interface CreateFormRequest {
  name: string;
  config: FormConfig;
  endsAt: Date | null;
}
