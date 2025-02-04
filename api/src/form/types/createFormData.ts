import { FormEntity } from "./formEntity";

export interface CreateFormData {
  config: Omit<FormEntity["config"], "id">;
  endsAt: Date | null;
}
