import { CustomError } from "@shared/errors/CustomError";

interface ApiErrorResponse {
  error: string;
}

interface ErrorWithStatus {
  message: string;
  status: number;
}

export const isErrorWithStatus = (error: unknown): error is ErrorWithStatus => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error &&
    typeof (error as any).status === "number"
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
    console.error("Unhandled error:", error.message, error.stack);
    return { error: "Internal server error" };
  }

  console.error("Unknown error:", error);
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

export const handleApiError = (error: unknown): Response => {
  const { error: message } = serializeApiError(error);
  const status = getErrorStatus(error);

  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};