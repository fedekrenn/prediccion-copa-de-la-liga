import { getUserByEmail, verifyPassword } from "@libs/users";
import { createToken } from "src/lib/auth";
import type { APIRoute } from "astro";
import { NewUser } from "@utils/dataValidation";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400 }
    );
  }

  const verifyUser = NewUser.safeParse({ email, password });

  if (!verifyUser.success) {
    return new Response(
      JSON.stringify({ error: verifyUser.error.issues[0].message }),
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
    const token = await createToken(email, user.id);

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
