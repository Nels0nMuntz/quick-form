import { FormEntity } from "./formEntity";

export interface CreateFormData {
  name: string;
  config: Omit<FormEntity["config"], "id">;
  endsAt: Date | null;
}
