import { db } from "../lib";
import { CreateUserData } from "./types/createUserData";
import { UserEntity } from "./types/userEntity";

export const findByEmail = async (
  email: string
): Promise<UserEntity | null> => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const create = async (data: CreateUserData) => {
  await db.user.create({
    data: {
      email: data.email,
      full_name: data.fullName,
      password_hash: data.password,
    },
  });
};

export default {
  findByEmail,
  create,
};
