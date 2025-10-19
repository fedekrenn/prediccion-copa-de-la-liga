/**
 * Checks if the provided Authorization header is a valid Bearer token.
 * @param authHeader The Authorization header value.
 * @returns The Bearer token if valid, otherwise false.
 */
export const isValidBearerToken = (
  authHeader: string | null
): string | false => {
  if (!authHeader) return false;

  const parts = authHeader.trim().split(" ");

  if (parts.length !== 2) return false;
  if (parts[0] !== "Bearer") return false;

  const token = parts[1];

  if (!token || token.length === 0) return false;

  if (
    !/^[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_=]+\.?[A-Za-z0-9\-_.+/=]*$/.test(token)
  ) {
    return false;
  }

  return token;
};
