import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@config/config";
import { client } from "@db/db";

export const createToken = async (payload: any, userId: string) => {
  try {
    const userTokens = await client.execute({
      sql: "SELECT * FROM tokens WHERE user_id = ?",
      args: [userId],
    });

    if (userTokens.rows.length > 0) {
      await client.execute({
        sql: "DELETE FROM tokens WHERE user_id = ?",
        args: [userId],
      });
    }

    const token = jwt.sign(payload + Date.now(), SECRET_KEY);

    await client.execute({
      sql: "INSERT INTO tokens (token, user_id) VALUES (?, ?)",
      args: [token, userId],
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw error;
  }
};
