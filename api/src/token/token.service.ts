import jwt from "jsonwebtoken";
import { TokenPair } from "./types/tokenPair";
import { TokenPayload } from "./types/tokenPayload";
import tokenRepository from "./token.repository";
import { BadRequestError } from "../utils";

const generate = (payload: TokenPayload): TokenPair => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: 10,
    algorithm: "HS256",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
  return { accessToken, refreshToken };
};

const getByToken = async (token: string) => {
  return await tokenRepository.getByToken(token);
};

const getByUserId = async (userId: string) => {
  return await tokenRepository.getByUserId(userId);
};

const save = async (userId: string, newToken: string) => {
  const oldToken = await tokenRepository.getByUserId(userId);
  if (oldToken) {
    await tokenRepository.remove(oldToken);
  }
  await tokenRepository.create(userId, newToken);
};

const remove = async (token: string) => {
  await tokenRepository.remove(token);
};

const validate = async (token: string) => {
  const payload = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as TokenPayload;
  const tokenEntity = await tokenRepository.getByToken(token);
  if (!tokenEntity || tokenEntity.userId !== payload.id) {
    throw new BadRequestError("Invalid refresh token");
  }
  return payload;
};

export default {
  generate,
  getByToken,
  getByUserId,
  save,
  remove,
  validate,
};
