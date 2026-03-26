import { getFixtureRoundsData } from "@usecases/fixture/getFixtureRounds";
import { createCorsResponse, handleOptionsRequest, corsHeaders } from "@shared/http/cors";
import { handleApiError } from "@shared/http/apiErrorHandler";
import type { APIRoute } from "astro";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async () => {
  try {
    const data = await getFixtureRoundsData();
    return createCorsResponse(JSON.stringify(data), 200);
  } catch (error: unknown) {
    return handleApiError(error, corsHeaders);
  }
};
