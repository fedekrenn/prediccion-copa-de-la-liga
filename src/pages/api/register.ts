import { register } from "@usecases/auth/register";
import { createCorsResponse, handleOptionsRequest } from "@shared/http/cors";
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

  try {
    const addedUser = await register(email, password);
    return createCorsResponse(JSON.stringify(addedUser), 201);
  } catch (error: any) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500
    );
  }
};
