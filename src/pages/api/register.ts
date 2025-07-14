import { addUser, getUserByEmail } from "@libs/users";
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

  if (user) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const addedUser = await addUser(isUserValid.data);

  return new Response(JSON.stringify(addedUser), { status: 201 });
};
