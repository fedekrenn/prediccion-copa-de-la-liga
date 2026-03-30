import { addUser, getUserByEmail } from "@repos/usersRepository";
import { createToken } from "@auth/tokenService";
import { ValidUser } from "@shared/validation/dataValidation";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

export const register = async (email: string, password: string) => {
  const isUserValid = ValidUser.safeParse({ email, password });

  if (!isUserValid.success) {
    throw new CustomError(
      isUserValid.error.issues[0].message,
      400,
      "Bad Request",
      ERROR_CODES.INVALID_CREDENTIALS_FORMAT,
    );
  }

  const user = await getUserByEmail(email);
  if (user) {
    throw new CustomError(
      "User already exists",
      400,
      "Bad Request",
      ERROR_CODES.USER_ALREADY_EXISTS,
    );
  }

  const addedUser = await addUser(isUserValid.data);
  const { token, expiration_date } = await createToken(email, addedUser.id);

  return { ...addedUser, token, expiration_date };
};
