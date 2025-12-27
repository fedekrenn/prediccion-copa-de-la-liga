import { getUserByEmail, verifyPassword } from "@repos/usersRepository";
import { deleteToken, getTokenFromUser } from "@auth/tokenService";
import { ValidUser } from "@shared/validation/dataValidation";
import { CustomError } from "@shared/errors/CustomError";

export const revokeToken = async (email: string, password: string) => {
  const isUserValid = ValidUser.safeParse({ email, password });

  if (!isUserValid.success) {
    throw new CustomError(
      isUserValid.error.issues[0].message,
      400,
      "Bad Request"
    );
  }

  const user = await getUserByEmail(email);
  if (!user) throw new CustomError("User not found", 404, "Not Found");

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) throw new CustomError("Invalid password", 401, "Unauthorized");

  const token = await getTokenFromUser(user.id);
  if (!token) throw new CustomError("Token not found", 404, "Not Found");

  await deleteToken(token);
};
