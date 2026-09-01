import { getUserByEmail, verifyPassword, getTokenByUserId } from "@repos/usersRepository";
import { createToken } from "@auth/tokenService";
import { ValidUser } from "@shared/validation/dataValidation";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

// Bcrypt hash of an arbitrary value, used only so verifyPassword always runs
// with the same cost factor whether or not the user exists. Without this,
// a missing user short-circuits before hashing, and the timing difference
// leaks account existence even though the error response is now identical.
const DUMMY_PASSWORD_HASH =
  "$2b$12$r.Dlg8oSq6VDrDmeUVps3OStEuqee9OJE6qncWi.1IwUT513eTKIu";

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
  const isValid = await verifyPassword(
    password,
    user?.password ?? DUMMY_PASSWORD_HASH,
  );

  if (!user || !isValid) {
    throw new CustomError(
      "Invalid email or password",
      401,
      "Unauthorized",
      ERROR_CODES.INVALID_CREDENTIALS,
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
