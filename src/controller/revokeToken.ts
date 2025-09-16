import { getUserByEmail, verifyPassword } from "@libs/users";
import { revokeToken, getTokenFromUser } from "@libs/auth";
import { ValidUser } from "@utils/dataValidation";
import { CustomError } from "@models/CustomError";

export const revokeTokeniooo = async (email: string, password: string) => {
  const isUserValid = ValidUser.safeParse({ email, password });

  if (!isUserValid.success)
    throw new CustomError(
      isUserValid.error.issues[0].message,
      400,
      "Bad Request"
    );

  const user = await getUserByEmail(email);
  if (!user) throw new CustomError("User not found", 404, "Not Found");

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) throw new CustomError("Invalid password", 401, "Unauthorized");

  const token = await getTokenFromUser(user.id);
  if (!token) throw new CustomError("Token not found", 404, "Not Found");

  await revokeToken(token);
};
