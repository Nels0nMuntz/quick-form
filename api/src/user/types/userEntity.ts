import { FormEntity } from "../../form/types/formEntity";

export interface UserEntity {
  id: string;
  email: string;
  full_name: string;
  password_hash: string;
  forms: FormEntity[];
  createdAt: Date;
  updatedAt: Date;
}
