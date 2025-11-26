import { useForm } from 'react-hook-form';
import type { RegisterRequest } from '../Types/register.types';
import InputRegister from '../Components/InputRegister/InputRegister.tsx';
import { useNavigate } from 'react-router'
import { useRegisterMutation } from '../api/authApi.ts';
import { formRegister } from '../Utils/formRegister.ts';
import ErrorItem from '../Components/ErrorItem/ErrorItem.tsx';

const Register = () => {
    
    const navigate = useNavigate();
    const [registerUser, { error: apiError }] = useRegisterMutation();
  const { 
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<RegisterRequest>({
    mode: 'onChange', 
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: RegisterRequest) => {
        try {
        await registerUser(formRegister(data)).unwrap()
        reset()
        navigate('/login')
        }
        catch (error) {
          console.log(error)
        }
  };

  return (
    <div className="p-10 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Регистрация
      </h1>
      
      <form 
        className="grid grid-cols-1 gap-4" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputRegister 
          typeField="firstName"
          register={register}
          error={errors.firstName?.message}
        />
        
        <InputRegister 
          typeField="lastName"
          register={register}
          error={errors.lastName?.message}
        />
        
        <InputRegister 
          typeField="email" 
          register={register}
          error={errors.email?.message}
        />
        
        <InputRegister 
          typeField="password"
          register={register}
          error={errors.password?.message}
        />
        
        <InputRegister 
          typeField="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
        />
        
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="p-3 bg-fuchsia-600 text-white rounded-2xl hover:bg-fuchsia-700 disabled:bg-gray-400 duration-500 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      {apiError ? (<ErrorItem apiError={apiError} />) : (<></>)}
    </div>
  );
};

export default Register;