import { Mapper } from "../../shared";
import { CreateUserData } from "../types/createUserData";

export const createUserDataMapper: Mapper<CreateUserData> = (data) => {
  return {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
  };
};
