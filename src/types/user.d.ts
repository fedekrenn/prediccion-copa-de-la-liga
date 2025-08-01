export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthenticatedUser extends UserCredentials {
  id: `${string}-${string}-${string}-${string}-${string}`;
}

export type AuthToken = string;
