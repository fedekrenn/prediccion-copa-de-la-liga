/**
 * CustomError class extends the built-in Error class to include
 * additional properties for HTTP status code and status text.
 */
export class CustomError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}
