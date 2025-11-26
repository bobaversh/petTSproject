import { useForm } from 'react-hook-form';
import type { LoginRequest } from '../Types/login.types';
import InputLogin from '../Components/InputLogin/InputLogin.tsx';
import { useNavigate } from 'react-router'
import { useLoginMutation } from '../api/authApi.ts'; 
import ErrorItem from '../Components/ErrorItem/ErrorItem.tsx';
import { getFingerprint } from '../Utils/fingerprint.ts';

const fingerprint = await getFingerprint()

const Login = () => {

  const navigate = useNavigate();
  const [loginUser, { error: apiError }] = useLoginMutation();
  
  const { 
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<LoginRequest>({
    mode: 'onChange', 
    defaultValues: {
      email: '',
      password: '',
      fingerprint: fingerprint,
    }
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response =  await loginUser(data).unwrap();
      reset();
      navigate('/');  
      localStorage.setItem('token', response.access_token)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Вход
      </h1>
      
      <form 
        className="grid grid-cols-1 gap-4" 
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
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>

      {apiError ? (<ErrorItem apiError={apiError} />) : null}
    </div>
  );
};

export default Login;