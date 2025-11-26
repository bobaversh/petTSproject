import type { UseFormRegister } from "react-hook-form";

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface RegisterResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface InputRegisterProps {
    register: UseFormRegister<RegisterRequest>;
    error?: string;
    typeField: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
  }

  export interface FormattedRegisterRequest {
    name: string;
    email: string;
    password: string;
  }