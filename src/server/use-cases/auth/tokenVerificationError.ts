import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { TokenRecordNotFoundError } from "@auth/tokenService";
import { ERROR_CODES } from "@shared/errors/errorCodes";

export type TokenVerificationFailureCode =
  | typeof ERROR_CODES.TOKEN_EXPIRED
  | typeof ERROR_CODES.INVALID_TOKEN
  | typeof ERROR_CODES.TOKEN_VALIDATION_FAILED;

export const mapTokenVerificationError = (
  error: unknown,
): TokenVerificationFailureCode => {
  if (error instanceof TokenExpiredError) {
    return ERROR_CODES.TOKEN_EXPIRED;
  }

  if (
    error instanceof JsonWebTokenError ||
    error instanceof TokenRecordNotFoundError
  ) {
    return ERROR_CODES.INVALID_TOKEN;
  }

  return ERROR_CODES.TOKEN_VALIDATION_FAILED;
};
