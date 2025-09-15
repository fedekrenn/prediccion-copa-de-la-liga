import { getUserByEmail, verifyPassword } from "@libs/users";
import { revokeToken, getTokenFromUser } from "src/lib/auth";
import { ValidUser } from "@utils/dataValidation";
import { createCorsResponse, handleOptionsRequest } from "@utils/cors";
import type { APIRoute } from "astro";

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

  try {
    const token = await getTokenFromUser(user.id);

    if (token) {
      await revokeToken(token);
      return createCorsResponse(
        JSON.stringify({ success: "Token was deleted" }),
        200
      );
    }

    return createCorsResponse(
      JSON.stringify({ error: "Token not found" }),
      404
    );
  } catch (error: any) {
    return createCorsResponse(JSON.stringify({ error: error.message }), 500);
  }
};
