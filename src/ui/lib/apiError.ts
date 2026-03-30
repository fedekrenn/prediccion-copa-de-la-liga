interface ApiErrorBody {
  error?: string;
  code?: string;
}

export class ApiRequestError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const buildApiRequestError = async (
  response: Response,
): Promise<ApiRequestError> => {
  let payload: ApiErrorBody | null = null;

  try {
    payload = (await response.json()) as ApiErrorBody;
  } catch {
    payload = null;
  }

  const message =
    typeof payload?.error === "string"
      ? payload.error
      : response.statusText || "Request failed";
  const code = typeof payload?.code === "string" ? payload.code : undefined;

  return new ApiRequestError(message, response.status, code);
};

export const getSpanishApiErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  if (!(error instanceof ApiRequestError)) {
    return fallbackMessage;
  }

  switch (error.code) {
    case "FIXTURE_ROUND_NOT_FOUND":
      return "No encontramos esa fecha.";
    case "UNAUTHORIZED":
      return "Necesitas autorizacion para acceder a esta informacion.";
    case "TOKEN_EXPIRED":
      return "Tu sesion vencio. Volve a iniciar sesion.";
    default:
      break;
  }

  if (error.status === 401) {
    return "Necesitas autorizacion para acceder a esta informacion.";
  }

  if (error.status >= 500) {
    return "Tuvimos un problema al cargar la informacion. Proba de nuevo en un rato.";
  }

  return fallbackMessage;
};
