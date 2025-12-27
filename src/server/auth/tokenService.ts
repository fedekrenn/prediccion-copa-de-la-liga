import jwt from "jsonwebtoken";
import { config } from "@config/config";
import { client } from "@repos/db";
import type { AuthToken, TokenResponse } from "@typos/user";

export const getTokenFromUser = async (
  userId: string
): Promise<AuthToken | null> => {
  const userToken = await client.execute({
    sql: "SELECT * FROM tokens WHERE user_id = ?",
    args: [userId],
  });

  if (userToken.rows.length === 0) return null;
  return userToken.rows[0].token as AuthToken;
};

export const createToken = async (
  payload: any,
  userId: string
): Promise<TokenResponse> => {
  const userToken = await getTokenFromUser(userId);

  if (userToken) {
    await client.execute({
      sql: "DELETE FROM tokens WHERE user_id = ?",
      args: [userId],
    });
  }

  const jwtPayload = {
    email: payload,
    userId,
    iat: Math.floor(Date.now() / 1000),
  };

  const expirationTimeInSeconds = config.auth.EXPIRATION_TIME;
  const expirationDate = new Date(Date.now() + expirationTimeInSeconds * 1000);

  const token = jwt.sign(jwtPayload, config.auth.SECRET_KEY, {
    expiresIn: expirationTimeInSeconds,
  });

  await client.execute({
    sql: "INSERT INTO tokens (token, user_id, expiration_date) VALUES (?, ?, ?)",
    args: [token, userId, expirationDate.toISOString()],
  });

  return { token, expiration_date: expirationDate };
};

export const verifyToken = async (token: string) => {
  const userToken = await client.execute({
    sql: "SELECT * FROM tokens WHERE token = ?",
    args: [token.toString()],
  });

  if (userToken.rows.length === 0) {
    throw new Error("Invalid token");
  }

  return jwt.verify(token, config.auth.SECRET_KEY);
};

export const deleteToken = async (token: AuthToken) => {
  await client.execute({
    sql: "DELETE FROM tokens WHERE token = ?",
    args: [token.toString()],
  });

  return true;
};
