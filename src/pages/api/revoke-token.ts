import { getUserByEmail, verifyPassword } from "@libs/users";
import { revokeToken, getTokenFromUser } from "src/lib/auth";
import { ValidUser } from "@utils/dataValidation";
import type { APIRoute } from "astro";

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

  try {
    const token = await getTokenFromUser(user.id);

    if (token) {
      await revokeToken(token);
      return new Response(JSON.stringify({ success: "Token was deleted" }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Token not found" }), {
      status: 404,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
