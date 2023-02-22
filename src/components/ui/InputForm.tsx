import { UseFormReturn } from 'react-hook-form';

import { ValidationMsg } from '../../constants';
import { InputAuth } from '../../types';

import { ValidationWarning } from './ValidationWarning';

type Props = {
  form: UseFormReturn<InputAuth, unknown>;
  name: keyof InputAuth;
  type: 'text' | 'password';
  placeholder?: string;
};

export const InputForm = ({ form, name, type, placeholder }: Props): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="input-form__wrapper flex flex-col">
      <input
        {...register(name, {
          required: ValidationMsg.empty,
          minLength: {
            value: 3,
            message: ValidationMsg.empty,
          },
          ...(name !== 'location' && {
            pattern: {
              value: /^\S*$/,
              message: ValidationMsg.noSpaces,
            },
          }),
        })}
        className="placeholder:text-xs placeholder:font-extralight outline outline-1 outline-neutral-200 focus:outline-neutral-500 focus:outline-2 px-3 h-8"
        type={type}
        placeholder={placeholder}
      />
      <ValidationWarning valid={!errors[name]}>{errors[name]?.message}</ValidationWarning>
    </div>
  );
};
