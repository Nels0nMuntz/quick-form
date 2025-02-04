import { FormConfig } from "@/shared/model";

export interface PublishFormRequest {
  config: FormConfig;
  endsAt?: Date;
}
