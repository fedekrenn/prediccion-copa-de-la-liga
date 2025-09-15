import { addUser, getUserByEmail } from "@libs/users";
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

  if (user) {
    return createCorsResponse(
      JSON.stringify({ error: "User already exists" }),
      400
    );
  }

  const addedUser = await addUser(isUserValid.data);

  return createCorsResponse(JSON.stringify(addedUser), 201);
};
