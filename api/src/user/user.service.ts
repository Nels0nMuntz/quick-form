import bcrypt from "bcrypt";
import { BadRequestError } from "../utils";
import { CreateUserData } from "./types/createUserData";
import userRepository from "./user.repository";
import { CurrentUser } from "./types/currentUser";

const create = async (data: CreateUserData) => {
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

const getCurrent = async (email: string): Promise<CurrentUser> => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new BadRequestError("User not found.");
  }
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
  };
};

export default {
  create,
  getCurrent,
};
