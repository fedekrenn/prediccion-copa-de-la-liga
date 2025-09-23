import { createCorsResponse, handleOptionsRequest } from "@utils/cors";
import type { APIRoute } from "astro";
import { revokeTokeniooo } from "@controllers/revokeToken";

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
    await revokeTokeniooo(email, password);
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
