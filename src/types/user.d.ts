// User credentials for login
export interface UserCredentials {
  email: string;
  password: string;
}

// Authenticated user with a unique ID
export interface AuthenticatedUser extends UserCredentials {
  id: `${string}-${string}-${string}-${string}-${string}`;
}

// Response containing the authentication token and its expiration date
export interface TokenResponse {
  token: AuthToken;
  expiration_date: Date;
}

// Type alias for the authentication token
export type AuthToken = string;
