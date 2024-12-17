import bcrypt from "bcryptjs";

type User = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  email: string;
  password: string;
};

const users: User[] = [];

export const addUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const id = crypto.randomUUID();

  const user = { id, email, password: hashedPassword };

  users.push(user);
  return { id, email };
};

export const getUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
