import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@config/config";

export const createToken = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
