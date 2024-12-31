import { db } from "../lib";

const create = async (userId: string, token: string) => {
  return await db.token.create({
    data: {
      userId,
      refresh_token: token,
    },
  });
};

const getByUserId = async (userId: string) => {
  const tokenEntity = await db.token.findUnique({
    where: {
      userId,
    },
  });
  return tokenEntity?.refresh_token;
};

const getByToken = async (token: string) => {
  return await db.token.findUnique({
    where: {
      refresh_token: token,
    },
  });
};

const remove = async (token: string) => {
  return await db.token.delete({
    where: {
      refresh_token: token,
    },
  });
};

export default {
  create,
  getByUserId,
  getByToken,
  remove,
};
