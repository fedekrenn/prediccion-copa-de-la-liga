import { CustomError } from "@shared/errors/CustomError";
import { logger } from "@shared/logger/logger";

interface ApiErrorResponse {
  error: string;
}

interface ErrorWithStatus {
  message: string;
  status: number;
}

export const isErrorWithStatus = (error: unknown): error is ErrorWithStatus => {
  const candidate = error as Record<string, unknown>;

  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error &&
    typeof candidate.status === "number" &&
    typeof candidate.message === "string"
  );
};

export const serializeApiError = (error: unknown): ApiErrorResponse => {
  if (error instanceof CustomError) {
    return { error: error.message };
  }

  if (isErrorWithStatus(error)) {
    return { error: error.message };
  }

  if (error instanceof Error) {
    logger.error({ err: error }, "Unhandled error in API route");
    return { error: "Internal server error" };
  }

  logger.error({ error }, "Unknown error in API route");
  return { error: "Internal server error" };
};

export const getErrorStatus = (error: unknown): number => {
  if (error instanceof CustomError) {
    return error.status;
  }

  if (isErrorWithStatus(error)) {
    return error.status;
  }

  return 500;
};

export const handleApiError = (
  error: unknown,
  additionalHeaders: HeadersInit = {}
): Response => {
  const { error: message } = serializeApiError(error);
  const status = getErrorStatus(error);

  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...additionalHeaders,
    },
  });
};
