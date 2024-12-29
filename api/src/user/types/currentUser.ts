import { UserEntity } from "./userEntity";

export interface CurrentUser extends Pick<UserEntity, "id" | "email"> {
  fullName: string;
}
