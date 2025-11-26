import type { FormattedRegisterRequest, RegisterRequest } from "../Types/register.types";

export const formRegister = (data: RegisterRequest): FormattedRegisterRequest => {
    const name = `${data.firstName} ${data.lastName}`.trim();
  
    return {
      name,
      email: data.email,
      password: data.password
    };
  };