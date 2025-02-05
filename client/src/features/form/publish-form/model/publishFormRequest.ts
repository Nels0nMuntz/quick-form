import { FormConfig } from "@/shared/model";

export interface PublishFormRequest {
  name: string;
  config: FormConfig;
  endsAt: Date | null;
}
