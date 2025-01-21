export interface User {
  email: string;
  password: string;
}

export interface FullUser extends User {
  id: `${string}-${string}-${string}-${string}-${string}`;
}

export type Token = String;