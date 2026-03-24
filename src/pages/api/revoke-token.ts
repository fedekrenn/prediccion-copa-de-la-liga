import { createCorsResponse, handleOptionsRequest } from "@shared/http/cors";
import { serializeApiError, getErrorStatus } from "@shared/http/apiErrorHandler";
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
    const { error: message } = serializeApiError(error);
    const status = getErrorStatus(error);

    return createCorsResponse(JSON.stringify({ error: message }), status);
  }
};
