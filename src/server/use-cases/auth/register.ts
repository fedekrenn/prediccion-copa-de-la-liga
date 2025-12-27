import { addUser, getUserByEmail } from "@repos/usersRepository";
import { createToken } from "@auth/tokenService";
import { ValidUser } from "@shared/validation/dataValidation";
import { CustomError } from "@shared/errors/CustomError";

export const register = async (email: string, password: string) => {
  const isUserValid = ValidUser.safeParse({ email, password });

  if (!isUserValid.success) {
    throw new CustomError(
      isUserValid.error.issues[0].message,
      400,
      "Bad Request"
    );
  }

  const user = await getUserByEmail(email);
  if (user) throw new CustomError("User already exists", 400, "Bad Request");

  const addedUser = await addUser(isUserValid.data);
  const { token, expiration_date } = await createToken(email, addedUser.id);

  return { ...addedUser, token, expiration_date };
};
