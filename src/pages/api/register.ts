import { addUser, getUserByEmail } from "@libs/users";
import { NewUser } from "@utils/dataValidation";
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

  const newUser = NewUser.safeParse({ email, password });

  if (!newUser.success) {
    return new Response(
      JSON.stringify({ error: newUser.error.issues[0].message }),
      {
        status: 400,
      }
    );
  }

  const addedUser = await addUser(newUser.data);

  return new Response(JSON.stringify(addedUser), { status: 201 });
};
