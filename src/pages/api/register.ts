import { addUser, getUserByEmail } from "@libs/users";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400 }
    );
  }

  const user = await getUserByEmail(email);

  if (user) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const newUser = await addUser(email, password);

  return new Response(JSON.stringify(newUser), { status: 201 });
};
