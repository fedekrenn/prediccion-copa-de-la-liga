import { getFixtureData } from "@usecases/fixture/getFixture";
import { createCorsResponse, handleOptionsRequest } from "@shared/http/cors";
import type { APIRoute } from "astro";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async () => {
  try {
    const data = await getFixtureData();
    return createCorsResponse(JSON.stringify(data), 200);
  } catch (error: any) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500,
    );
  }
};
