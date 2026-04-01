import { verifyToken } from "@auth/tokenService";
import { isValidBearerToken } from "@shared/auth/isValidBearerToken";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";
import { mapTokenVerificationError } from "@usecases/auth/tokenVerificationError";

const createUnauthorizedError = (code: string) => {
  const messageByCode: Record<string, string> = {
    [ERROR_CODES.UNAUTHORIZED]: "You are not authorized to access this resource",
    [ERROR_CODES.TOKEN_EXPIRED]: "Token has expired. Please obtain a new token.",
    [ERROR_CODES.INVALID_TOKEN]: "Invalid token provided.",
    [ERROR_CODES.TOKEN_VALIDATION_FAILED]:
      "Token validation failed. Please obtain a new token.",
  };

  return new CustomError(messageByCode[code], 401, "Unauthorized", code);
};

export const requireProtectedQueryAuth = async (authHeader: string | null) => {
  const token = isValidBearerToken(authHeader);

  if (!token) {
    throw createUnauthorizedError(ERROR_CODES.UNAUTHORIZED);
  }

  try {
    await verifyToken(token);
  } catch (error) {
    const errorCode = mapTokenVerificationError(error);
    throw createUnauthorizedError(errorCode);
  }
};
