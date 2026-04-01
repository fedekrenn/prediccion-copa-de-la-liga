import { createCorsResponse, handleOptionsRequest, corsHeaders } from "@shared/http/cors";
import { handleApiError } from "@shared/http/apiErrorHandler";
import type { APIRoute } from "astro";
import { revokeToken } from "@usecases/auth/revokeToken";
import { ERROR_CODES } from "@shared/errors/errorCodes";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return createCorsResponse(
      JSON.stringify({
        error: "Email and password are required",
        code: ERROR_CODES.INVALID_PARAMETERS,
      }),
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
