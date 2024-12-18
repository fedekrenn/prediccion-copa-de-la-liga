import bcrypt from "bcryptjs";
import { createClient } from "@libsql/client";
import type { User } from "@typos/user";

const client = createClient({
  url: import.meta.env.DATABASE_URL ?? "",
  authToken: import.meta.env.DATABASE_TOKEN ?? "",
});

export const addUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const id = crypto.randomUUID();

  const user: User = { id, email, password: hashedPassword };

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

  return users.rows[0] as unknown as User;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
