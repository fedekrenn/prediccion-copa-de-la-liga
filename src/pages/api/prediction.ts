import { getPrediction } from "@controllers/prediction";
import { createCorsResponse, handleOptionsRequest } from "@utils/cors";
import type { APIRoute } from "astro";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async ({ request }) => {
  const urlParams = new URL(request.url);
  const params = new URLSearchParams(urlParams.search);

  const position = params.get("position") || undefined;
  const name = params.get("name") || undefined;
  const classification = params.get("classification") || undefined;

  const authHeader = request.headers.get("Authorization");

  try {
    const data = await getPrediction(authHeader, {
      position,
      name,
      classification,
    });

    return createCorsResponse(JSON.stringify(data), 200);
  } catch (error: any) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500
    );
  }
};
