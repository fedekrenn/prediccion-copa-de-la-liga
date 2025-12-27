export type AuthToken = string;

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthenticatedUser extends UserCredentials {
  id: `${string}-${string}-${string}-${string}-${string}`;
}

export interface TokenResponse {
  token: AuthToken;
  expiration_date: Date;
}
