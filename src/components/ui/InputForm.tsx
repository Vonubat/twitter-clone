import { forwardRef } from 'react';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';

import { ValidationMsg } from '../../constants';
import { CustomFormInputs, InputName } from '../../types';

import { ValidationWarning } from './ValidationWarning';

type Props = {
  form: UseFormReturn<CustomFormInputs, unknown>;
  name: InputName;
  type: 'text' | 'password';
  placeholder?: string;
};

type Ref = HTMLInputElement & HTMLTextAreaElement;

type RefProps = {
  className: string;
  type: string;
  autoFocus?: boolean;
  placeholder?: string;
} & ReturnType<UseFormRegister<CustomFormInputs>>;

const Input = forwardRef<Ref, RefProps>((props, ref): JSX.Element => {
  return props.name === 'contentTextarea' ? <textarea {...props} ref={ref} /> : <input {...props} ref={ref} />;
});

export const InputForm = ({ form, name, type, placeholder }: Props): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="input-form__wrapper flex flex-col">
      <Input
        {...register(name, {
          required: ValidationMsg.empty,
          minLength: {
            value: 3,
            message: ValidationMsg.empty,
          },
          validate: (value) => {
            return !!value.trim() || ValidationMsg.notOnlySpaces;
          },
          ...(name !== 'location' &&
            name !== 'contentTextarea' && {
              pattern: {
                value: /^\S*$/,
                message: ValidationMsg.noSpaces,
              },
            }),
          ...(name === 'url' && {
            pattern: {
              value:
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
              message: ValidationMsg.nonValidUrl,
            },
          }),
        })}
        className={`${
          name === 'contentTextarea' ? 'h-40 resize-none py-3' : 'h-8'
        } px-3 outline outline-1 outline-neutral-200 placeholder:text-xs placeholder:font-extralight focus:outline-2 focus:outline-neutral-500`}
        type={type}
        placeholder={placeholder}
      />
      <ValidationWarning valid={!errors[name]}>{errors[name]?.message}</ValidationWarning>
    </div>
  );
};
