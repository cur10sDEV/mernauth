import { genSalt, hash, compare } from "bcrypt";

export const getHashPass = async (pass) => {
  const salt = await genSalt(12);
  const hashed = await hash(pass, salt);
  return hashed;
};

export const comparePass = async (pass, hash) => {
  const result = await compare(pass, hash);
  return result;
};
