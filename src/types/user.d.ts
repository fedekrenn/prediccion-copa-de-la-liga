/**
 * Authentication token type
 */
export type AuthToken = string;

/**
 * User credentials for authentication
 */
export interface UserCredentials {
  email: string;
  password: string;
}

/**
 * Authenticated user information
 */
export interface AuthenticatedUser extends UserCredentials {
  id: `${string}-${string}-${string}-${string}-${string}`;
}

/**
 * Response structure for token generation
 */
export interface TokenResponse {
  token: AuthToken;
  expiration_date: Date;
}
