/**
 * CustomError extends Error to carry HTTP status metadata.
 */
export class CustomError extends Error {
  status: number;
  statusText: string;
  code?: string;

  constructor(message: string, status: number, statusText: string, code?: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.code = code;
  }
}
