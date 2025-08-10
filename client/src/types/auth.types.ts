// src/types/auth.types.ts

export interface signUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  identifier: string; 
  password: string;
}


export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthError {
  message: string;
  code?: string;
}
