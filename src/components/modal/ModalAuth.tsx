import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { RenderModalBackdropProps } from 'react-overlays/cjs/Modal';

import closeBtn from '../../assets/icons/close.png';
import { ValidationMsg } from '../../constants';
import { useTwitter } from '../../hooks';
import { CustomFormInputs } from '../../types';
import { Button } from '../ui/Button';
import { InputForm } from '../ui/InputForm';

export const ModalAuth = (): JSX.Element => {
  const form = useForm<CustomFormInputs>();
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitSuccessful, isDirty, isValidating },
  } = form;
  const { showAuthModal, setShowAuthModal, logIn, signUp } = useTwitter();

  const handleClose = (): void => setShowAuthModal(null);

  const handleFormSubmit = (data: CustomFormInputs): void => {
    if (showAuthModal === 'login') {
      const res = logIn(data);

      if (res === ValidationMsg.cantFindUser) {
        setError('username', {
          type: 'manual',
          message: ValidationMsg.cantFindUser,
        });

        setError('password', {
          type: 'manual',
          message: ValidationMsg.cantFindUser,
        });

        return;
      }
    }

    if (showAuthModal === 'signup') {
      const res = signUp(data);

      if (res === ValidationMsg.userIsExist) {
        setError('username', {
          type: 'manual',
          message: ValidationMsg.userIsExist,
        });

        return;
      }
    }

    setShowAuthModal(null);
  };

  const resetForm: () => void = useCallback((): void => {
    reset({ username: '', password: '', firstName: '', lastName: '', location: '' });
  }, [reset]);

  useEffect((): void => {
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, resetForm]);

  useEffect((): void => {
    if (isValidating) {
      clearErrors();
    }
  }, [isValidating, clearErrors]);

  const renderBackdrop = (props: RenderModalBackdropProps) => (
    <div className="fixed z-50 top-0 right-0  bottom-0 left-0 bg-black/50" {...props} />
  );

  return (
    <Modal
      className="modal p-7 w-[300px] flex flex-col items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white rounded-md shadow-md"
      show={!!showAuthModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title font-semibold text-lg text-black text-opacity-50 text-center">
            {showAuthModal === 'login' ? 'Log In' : 'Sign Up'}
          </div>
          {showAuthModal === 'signup' && (
            <button
              className="modal__link text-sm text-black  text-opacity-50 hover:underline underline-offset-4"
              onClick={() => setShowAuthModal('login')}
            >
              Already signed up?
            </button>
          )}
        </div>
        <form className="modal__desc w-full flex flex-col gap-4 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
          <InputForm form={form} name="username" type="text" placeholder="Nickname" />
          <InputForm form={form} name="password" type="password" placeholder="Password" />
          {showAuthModal === 'signup' && (
            <InputForm form={form} name="firstName" type="text" placeholder="First Name" />
          )}
          {showAuthModal === 'signup' && <InputForm form={form} name="lastName" type="text" placeholder="Last Name" />}
          {showAuthModal === 'signup' && <InputForm form={form} name="location" type="text" placeholder="Location" />}
          <Button
            externalStyle="mt-3"
            size="large"
            type="submit"
            color="solid"
            disabled={!isDirty || Boolean(Object.keys(errors).length)}
          >
            {showAuthModal === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
        </form>

        <button className="button__close w-5 h-5 absolute -top-6 -right-6" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
