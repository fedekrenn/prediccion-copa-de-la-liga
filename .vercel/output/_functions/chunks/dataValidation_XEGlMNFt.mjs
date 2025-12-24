import bcrypt from 'bcryptjs';
import { b as client } from './CustomError_CAa_Qado.mjs';
import { z } from 'zod';

const addUser = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const id = crypto.randomUUID();
  const user = { id, email, password: hashedPassword };
  await client.execute({
    sql: "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
    args: [user.id, user.email, user.password]
  });
  return { id, email };
};
const getUserByEmail = async (email) => {
  const users = await client.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email]
  });
  return users.rows[0];
};
const getTokenByUserId = async (userId) => {
  const tokens = await client.execute({
    sql: "SELECT token, expiration_date FROM tokens WHERE user_id = ?",
    args: [userId]
  });
  return tokens.rows[0];
};
const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const ValidUser = z.object({
  email: z.string().email({ message: "Invalid email format" }).min(10, { message: "Email must be at least 10 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

export { ValidUser as V, getTokenByUserId as a, addUser as b, getUserByEmail as g, verifyPassword as v };
