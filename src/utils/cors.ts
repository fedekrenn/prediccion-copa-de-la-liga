export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

/**
 * Adds CORS headers to the response.
 * @param response The response object to modify.
 * @returns The modified response object with CORS headers.
 */
export const addCorsHeaders = (response: Response): Response => {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};

/**
 * Creates a new Response object with CORS headers.
 * @param body The response body.
 * @param status The HTTP status code.
 * @param additionalHeaders Additional headers to include in the response.
 * @returns A new Response object with CORS headers.
 */
export const createCorsResponse = (
  body: string,
  status: number = 200,
  additionalHeaders: Record<string, string> = {}
): Response => {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...additionalHeaders,
    },
  });
};

/**
 * Handles OPTIONS requests for CORS preflight.
 * @returns A Response object with CORS headers.
 */
export const handleOptionsRequest = (): Response => {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
};
