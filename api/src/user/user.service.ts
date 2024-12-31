import bcrypt from "bcrypt";
import { BadRequestError, NotAuthorizedError } from "../utils";
import { CreateUserData } from "./types/createUserData";
import userRepository from "./user.repository";
import { CurrentUser } from "./types/currentUser";
import { tokenService } from "../token";

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

const createTokensPair = async ({ id, email }: CurrentUser) => {
  const token = await tokenService.getByUserId(id);
  if (token) {
    await tokenService.remove(token);
  }

  const tokens = tokenService.generate({
    id,
    email,
  });

  await tokenService.save(id, tokens.refreshToken);

  return tokens;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new NotAuthorizedError("Token not provided.");
  }

  const validToken = await tokenService.validate(token);
  const tokenFromDB = await tokenService.getByToken(token);

  if (!validToken || !tokenFromDB) {
    throw new NotAuthorizedError("Invalid refresh token.");
  }

  const user = await userRepository.findByEmail(validToken.email);
  if (!user) {
    throw new BadRequestError("User not found.");
  }

  await tokenService.remove(token);

  const tokens = tokenService.generate({
    id: user.id,
    email: user.email,
  });

  await tokenService.save(user.id, tokens.refreshToken);

  return tokens;
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
  createTokensPair,
  refreshToken,
  getCurrent,
};
