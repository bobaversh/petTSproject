import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { LoginRequest } from "../Types/login.types";
import InputLogin from "../Components/InputLogin/InputLogin.tsx";
import { useNavigate, Link } from "react-router";
import { useLoginMutation } from "../api/authApi.ts";
import ErrorItem from "../Components/ErrorItemApi/ErrorItemApi.tsx";
import { getFingerprint } from "../Utils/fingerprint.ts";
import Header from "../Components/Header/Header.tsx";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { error: apiError }] = useLoginMutation();
  const [fingerprint, setFingerprint] = useState<string>("");

  useEffect(() => {
    getFingerprint().then(setFingerprint).catch(console.error);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
  } = useForm<LoginRequest>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      fingerprint: "",
    },
  });

  useEffect(() => {
    if (fingerprint) {
      setValue("fingerprint", fingerprint);
    }
  }, [fingerprint]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await loginUser(data).unwrap();
      reset();
      navigate("/");
      localStorage.setItem("token", response.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-10 mt-10 w-full max-w-md mx-auto">
        <article>
          <header>
            <h1 className="text-3xl text-center text-white font-extrabold">
              Войдите в аккаунт
            </h1>

            <p className="mt-2 text-center text-sm text-[#fff8] px-8 mb-10">
              У вас нет аккаунта?
              <Link
                to={"/register"}
                className="font-medium active:scale-105 duration-300 cursor-pointer ml-2 text-purple-500"
              >
                Зарегистрируйтесь
              </Link>
            </p>
          </header>

          <section>
            <form
              className="grid grid-cols-1 text-white gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputLogin
                typeField="email"
                register={register}
                error={errors.email?.message}
              />

              <InputLogin
                typeField="password"
                register={register}
                error={errors.password?.message}
              />

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="p-3 bg-fuchsia-600 text-white rounded-2xl hover:bg-fuchsia-700 disabled:bg-gray-400 duration-500 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Вход..." : "Войти"}
              </button>
            </form>

            {apiError && (
              <aside>
                <ErrorItem apiError={apiError} />
              </aside>
            )}
          </section>
        </article>
      </div>
    </>
  );
};

export default Login;
