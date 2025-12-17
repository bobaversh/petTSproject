import { useEffect, type FC, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTemplateQuery } from "../api/templateApi";
import { isUnauthorizedError } from "../Utils/401errorUtils";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const navigate = useNavigate();

  const {
    data: templateData,
    error: templateError,
    isLoading,
  } = useGetTemplateQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (templateError) {
      const isAuthError = isUnauthorizedError(templateError);
      if (isAuthError) {
        navigate("/login", { replace: true });
      }
    }
  }, [templateError]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-2 border-transparent w-10 h-10 border-b-purple-500 animate-spin rounded-full" />
        <span className="ml-3 text-gray-600">Проверка авторизации...</span>
      </div>
    );
  }

  if (templateData) {
    return <>{children}</>;
  }
};
