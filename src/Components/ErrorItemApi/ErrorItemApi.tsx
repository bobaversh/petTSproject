import type { ErrorItemProps } from "../../Types/error.types";

const ErrorItem = ({ apiError }: ErrorItemProps) => {
  if (!apiError) return null;

  const getErrorMessage = () => {
    if ("status" in apiError) {
      if (typeof apiError.status === "number") {
        switch (apiError.status) {
          case 400:
            if (apiError.data && typeof apiError.data === "object") {
              const errorData = apiError.data as any;
              if (errorData.detail) {
                if (errorData.detail.toLowerCase().includes("email")) {
                  return "Этот email уже используется";
                }
                if (
                  errorData.detail.toLowerCase().includes("invalid credentials")
                ) {
                  return "Неверный email или пароль";
                }
                return errorData.detail;
              }
            }
            return "Некорректные данные";
          case 401:
            return "Не авторизован";
          case 403:
            return "Доступ запрещен";
          case 404:
            return "Ресурс не найден";
          case 500:
            return "Внутренняя ошибка сервера";
          default:
            return `Ошибка ${apiError.status}`;
        }
      }

      if (apiError.status === "FETCH_ERROR") {
        return "Ошибка подключения к серверу";
      }
      if (apiError.status === "PARSING_ERROR") {
        return "Ошибка обработки ответа от сервера";
      }

      if (apiError.data && typeof apiError.data === "object") {
        const errorData = apiError.data as any;
        return (
          errorData.detail ||
          errorData.message ||
          errorData.detailError ||
          JSON.stringify(apiError.data)
        );
      }
    }

    if ("message" in apiError && apiError.message) {
      return apiError.message;
    }

    return "Произошла неизвестная ошибка";
  };

  return (
    <div className="error-item bg-red-50 border border-red-200 rounded-2xl my-3 p-4">
      <p className="text-red-700">{getErrorMessage()}</p>
    </div>
  );
};

export default ErrorItem;
