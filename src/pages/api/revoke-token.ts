import { createCorsResponse, handleOptionsRequest } from "@shared/http/cors";
import type { APIRoute } from "astro";
import { revokeToken } from "@usecases/auth/revokeToken";

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
    await revokeToken(email, password);
    return createCorsResponse(
      JSON.stringify({ success: "Token was deleted" }),
      200
    );
  } catch (error: any) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500
    );
  }
};
