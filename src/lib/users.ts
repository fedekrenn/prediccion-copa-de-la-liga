import bcrypt from "bcryptjs";
import { client } from "@db/db";
import type {
  UserCredentials,
  AuthenticatedUser,
  AuthToken,
} from "@typos/user";

export const addUser = async ({ email, password }: UserCredentials) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const id = crypto.randomUUID();

  const user: AuthenticatedUser = { id, email, password: hashedPassword };

  await client.execute({
    sql: "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
    args: [user.id, user.email, user.password],
  });

  return { id, email };
};

export const getUserByEmail = async (email: string) => {
  const users = await client.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email],
  });

  return users.rows[0] as unknown as AuthenticatedUser;
};

export const getTokenByUserId = async (userId: string) => {
  const tokens = await client.execute({
    sql: "SELECT token FROM tokens WHERE user_id = ?",
    args: [userId],
  });

  return tokens.rows[0] as unknown as AuthToken;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
