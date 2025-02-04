import { FormEntity } from "src/form/types/formEntity";
import { UserEntity } from "./userEntity";

export interface CurrentUser extends Pick<UserEntity, "id" | "email"> {
  fullName: string;
  forms: Omit<FormEntity, "config">[];
}
