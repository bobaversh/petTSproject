import type { RegisterRequest } from "../Types/register.types";

export const validationRules = {
    firstName: {
      required: "Это поле является обязательным",
      minLength: {
        value: 2,
        message: "Введите минимум 2 символа"
      },
      pattern: {
        value: /^[A-Za-zА-Яа-я]+$/i,
        message: "Это поле не может содержать цифры"
      }
    },
    lastName: {
      required: "Это поле является обязательным",
      minLength: {
        value: 2,
        message: "Введите минимум 2 символа"
      },
      pattern: {
        value: /^[A-Za-zА-Яа-я]+$/i,
        message: "Это поле не может содержать цифры"
      }
    },
    email: {
      required: "Email обязателен",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Неверный формат email"
      }
    },
    password: {
      required: "Пароль обязателен",
      minLength: {
        value: 8,
        message: "Минимум 8 символов"
      }
    },
    confirmPassword: {
      required: "Подтверждение пароля обязательно",
      validate: (value: string, formValues: RegisterRequest) => 
        value === formValues.password || "Пароли не совпадают"
    }
  };

  export const placeholderText = {
    firstName: "Введите имя",
    lastName: "Введите фамилию", 
    email: "Введите почту",
    password: "Введите пароль",
    confirmPassword: "Подтвердите пароль"
  };
