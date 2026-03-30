import type { APIRoute } from "astro";

import { createCorsResponse, handleOptionsRequest, corsHeaders } from "@shared/http/cors";
import { handleApiError } from "@shared/http/apiErrorHandler";
import { getToken } from "@usecases/auth/getToken";
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
    const token = await getToken(email, password);
    return createCorsResponse(JSON.stringify(token), 200);
  } catch (error: unknown) {
    return handleApiError(error, corsHeaders);
  }
};
