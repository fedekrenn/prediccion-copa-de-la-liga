import type { APIRoute } from "astro";
import { ValidUser } from "@utils/dataValidation";
import { getUserByEmail, verifyPassword, getTokenByUserId } from "@libs/users";
import { createCorsResponse, handleOptionsRequest } from "@utils/cors";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return createCorsResponse(
      JSON.stringify({ error: "Email and password are required" }),
      400
    );
  }

  const isUserValid = ValidUser.safeParse({ email, password });

  if (!isUserValid.success) {
    return createCorsResponse(
      JSON.stringify({ error: isUserValid.error.issues[0].message }),
      400
    );
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return createCorsResponse(JSON.stringify({ error: "User not found" }), 404);
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return createCorsResponse(
      JSON.stringify({ error: "Invalid password" }),
      401
    );
  }

  const token = await getTokenByUserId(user.id);

  if (!token) {
    return createCorsResponse(
      JSON.stringify({ error: "Token not found" }),
      404
    );
  }

  return createCorsResponse(JSON.stringify(token), 200);
};
