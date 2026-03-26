import { createCorsResponse, handleOptionsRequest, corsHeaders } from "@shared/http/cors";
import { handleApiError } from "@shared/http/apiErrorHandler";
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
  } catch (error: unknown) {
    return handleApiError(error, corsHeaders);
  }
};
