import { getFixtureRoundsData } from "@usecases/fixture/getFixtureRounds";
import { createCorsResponse, handleOptionsRequest } from "@shared/http/cors";
import { serializeApiError, getErrorStatus } from "@shared/http/apiErrorHandler";
import type { APIRoute } from "astro";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async () => {
  try {
    const data = await getFixtureRoundsData();
    return createCorsResponse(JSON.stringify(data), 200);
  } catch (error: unknown) {
    const { error: message } = serializeApiError(error);
    const status = getErrorStatus(error);

    return createCorsResponse(JSON.stringify({ error: message }), status);
  }
};
