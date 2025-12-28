import type { InputRegisterProps } from "../../Types/register.types";
import { validationRules, placeholderText } from "../../Utils/validationRules";

const InputRegister = ({ typeField, register, error }: InputRegisterProps) => {

  return (
    <div className="w-full">

        {error && (<p className="mb-1 text-sm text-red-600">{error}</p>)}

      <input
        className={`p-3 border-2 text-white rounded-2xl w-full bg-(--bg-color-second) focus:outline-none ${
          error ? 'border-red-500' : 'border-fuchsia-600'
        }`}
        {...register(typeField, validationRules[typeField])}
        placeholder={placeholderText[typeField]}
        type={typeField.includes('password') ? 'password' : 'text'}
      /> 
    </div>
  );
};

export default InputRegister;
