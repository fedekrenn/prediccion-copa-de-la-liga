import { getUserByEmail, verifyPassword } from "@repos/usersRepository";
import { deleteToken, getTokenFromUser } from "@auth/tokenService";
import { ValidUser } from "@shared/validation/dataValidation";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

// Bcrypt hash of an arbitrary value, used only so verifyPassword always runs
// with the same cost factor whether or not the user exists. Without this,
// a missing user short-circuits before hashing, and the timing difference
// leaks account existence even though the error response is now identical.
const DUMMY_PASSWORD_HASH =
  "$2b$08$3L4iAuZodZPycHGDx.IWJugh6ZJHCl5FeTNjVgWaNafnEAfHipjBq";

export const revokeToken = async (email: string, password: string) => {
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

  const token = await getTokenFromUser(user.id);
  if (!token) {
    throw new CustomError("Token not found", 404, "Not Found", ERROR_CODES.TOKEN_NOT_FOUND);
  }

  await deleteToken(token);
};
