import { getUserByEmail, verifyPassword, getTokenByUserId } from "@repos/usersRepository";
import { createToken } from "@auth/tokenService";
import { ValidUser } from "@shared/validation/dataValidation";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

export const getToken = async (email: string, password: string) => {
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
  if (!user) {
    throw new CustomError("User not found", 404, "Not Found", ERROR_CODES.USER_NOT_FOUND);
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new CustomError(
      "Invalid password",
      401,
      "Unauthorized",
      ERROR_CODES.INVALID_PASSWORD,
    );
  }

  const existingToken = await getTokenByUserId(user.id);

  if (existingToken) {
    const expirationDate = new Date(existingToken.expiration_date);
    const currentDate = new Date();

    if (currentDate < expirationDate) {
      return {
        token: existingToken.token,
        expiration_date: existingToken.expiration_date,
        status: "existing_valid_token",
      };
    }
  }

  const newToken = await createToken(email, user.id);

  return {
    token: newToken.token,
    expiration_date: newToken.expiration_date,
    status: existingToken ? "token_renewed" : "new_token_created",
  };
};
