import type { APIRoute } from "astro";

import { createCorsResponse, handleOptionsRequest } from "@utils/cors";
import { getToken } from "@controllers/getToken";

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
    const token = await getToken(email, password);
    return createCorsResponse(JSON.stringify(token), 200);
  } catch (error: any) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500
    );
  }
};
