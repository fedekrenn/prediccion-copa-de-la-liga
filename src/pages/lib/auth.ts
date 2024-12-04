import jwt from "jsonwebtoken";

const SECRET_KEY = import.meta.env.SECRET_KEY;

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
