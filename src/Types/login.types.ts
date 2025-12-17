import type { UseFormRegister } from "react-hook-form";

export interface LoginRequest {
    email: string
    password: string
    fingerprint?: string
}

export interface LoginResponse {
    access_token: string
    token_type: string
}

export type InputLoginProps = {
    typeField: keyof LoginRequest;
    register: UseFormRegister<LoginRequest>;
    error?: string;
  };