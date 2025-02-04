import { db } from "../lib";
import { CreateUserData } from "./types/createUserData";

export const findByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
    include: {
      forms: true,
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
