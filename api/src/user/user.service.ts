import bcrypt from "bcrypt";
import { BadRequestError } from "../utils";
import { CreateUserData } from "./types/createUserData";
import userRepository from "./user.repository";

export const create = async (data: CreateUserData) => {
  const userByEmail = await userRepository.findByEmail(data.email);
  if (userByEmail) {
    throw new BadRequestError("Email already in use.");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user: CreateUserData = {
    email: data.email.trim(),
    fullName: data.fullName.trim(),
    password: hashedPassword,
  };
  await userRepository.create(user);
};

export default {
  create,
};
