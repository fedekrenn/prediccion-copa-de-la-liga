import type { APIRoute } from "astro";
import { ValidUser } from "@utils/dataValidation";
import { getUserByEmail, verifyPassword, getTokenByUserId } from "@libs/users";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400 }
    );
  }

  const isUserValid = ValidUser.safeParse({ email, password });

  if (!isUserValid.success) {
    return new Response(
      JSON.stringify({ error: isUserValid.error.issues[0].message }),
      {
        status: 400,
      }
    );
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });
  }

  const token = await getTokenByUserId(user.id);

  if (!token) {
    return new Response(JSON.stringify({ error: "Token not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(token), { status: 200 });
};
