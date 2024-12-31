import { Mapper } from "../../shared";
import { SignInUserData } from "../types/signInUserData";

export const signInUserDataMapper: Mapper<SignInUserData> = (data) => {
  return {
    email: data.email,
    password: data.password,
  };
};
