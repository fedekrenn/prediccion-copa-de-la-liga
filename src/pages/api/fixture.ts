import { getFixtureData } from "@usecases/fixture/getFixture";
import { createCorsResponse, handleOptionsRequest, corsHeaders } from "@shared/http/cors";
import { handleApiError } from "@shared/http/apiErrorHandler";
import { ERROR_CODES } from "@shared/errors/errorCodes";
import type { APIRoute } from "astro";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async ({ request }) => {
  const urlParams = new URL(request.url);
  const params = new URLSearchParams(urlParams.search);

  const allowedParams = ["round", "team", "status", "date"];
  const providedParams = Array.from(params.keys());

  const invalidParams = providedParams.filter(
    (param) => !allowedParams.includes(param),
  );

  if (invalidParams.length > 0) {
    return createCorsResponse(
      JSON.stringify({
        error: `Invalid parameter(s): ${invalidParams.join(
          ", ",
        )}. Allowed parameters are: ${allowedParams.join(", ")}`,
        code: ERROR_CODES.INVALID_PARAMETERS,
      }),
      400,
    );
  }

  const paramsObject = Object.fromEntries(params);
  const authHeader = request.headers.get("Authorization");

  try {
    const data = await getFixtureData(authHeader, paramsObject);
    return createCorsResponse(JSON.stringify(data), 200);
  } catch (error: unknown) {
    return handleApiError(error, corsHeaders);
  }
};
