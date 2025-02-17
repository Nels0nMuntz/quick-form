import { FormConfig } from "@/shared/model";

export interface UpdateFormRequest {
  id: number;
  name: string;
  config: FormConfig & { id: string };
  endsAt: Date | null;
}
