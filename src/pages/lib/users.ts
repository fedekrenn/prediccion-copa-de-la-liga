import bcrypt from "bcryptjs";

type User = {
  email: string;
  password: string;
};

const users: User[] = [];

export const addUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = { email, password: hashedPassword };
  users.push(user);
  return user;
};

export const getUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
}