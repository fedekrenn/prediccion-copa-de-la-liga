const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true"
};
const createCorsResponse = (body, status = 200, additionalHeaders = {}) => {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...additionalHeaders
    }
  });
};
const handleOptionsRequest = () => {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
};

export { corsHeaders as a, createCorsResponse as c, handleOptionsRequest as h };
