import { FormEntity } from "./formEntity";

export type CreateFormData = Pick<FormEntity, "config" | "endsAt">;
