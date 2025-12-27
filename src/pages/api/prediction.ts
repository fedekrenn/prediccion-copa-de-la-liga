import { getPrediction } from "@usecases/prediction/getPrediction";
import { createCorsResponse, handleOptionsRequest } from "@shared/http/cors";
import type { APIRoute } from "astro";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async ({ request }) => {
  const urlParams = new URL(request.url);
  const params = new URLSearchParams(urlParams.search);

  const allowedParams = ["position", "name", "classification"];
  const providedParams = Array.from(params.keys());

  const invalidParams = providedParams.filter(
    (param) => !allowedParams.includes(param)
  );

  if (invalidParams.length > 0) {
    return createCorsResponse(
      JSON.stringify({
        error: `Invalid parameter(s): ${invalidParams.join(
          ", "
        )}. Allowed parameters are: ${allowedParams.join(", ")}`,
      }),
      400
    );
  }

  const paramsObject = Object.fromEntries(params);
  const authHeader = request.headers.get("Authorization");

  try {
    const data = await getPrediction(authHeader, paramsObject);

    return createCorsResponse(JSON.stringify(data), 200);
  } catch (error: any) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500
    );
  }
};
