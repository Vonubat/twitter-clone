import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { RenderModalBackdropProps } from 'react-overlays/cjs/Modal';

import closeBtn from '../../assets/icons/close.png';
import { ValidationMsg } from '../../constants';
import { useTwitter } from '../../hooks';
import { CustomFormInputs } from '../../types';
import { Button } from '../ui/Button';
import { InputForm } from '../ui/InputForm';

export const ModalForm = (): JSX.Element => {
  const form = useForm<CustomFormInputs>();
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitSuccessful, isDirty, isValidating },
  } = form;
  const { showModalForm, setShowModalForm, logIn, signUp, changeImg, addTweet } = useTwitter();

  const handleClose = (): void => setShowModalForm(null);

  const handleFormSubmit = (data: CustomFormInputs): void => {
    if (showModalForm === 'login') {
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

    if (showModalForm === 'signup') {
      const res = signUp(data);

      if (res === ValidationMsg.userIsExist) {
        setError('username', {
          type: 'manual',
          message: ValidationMsg.userIsExist,
        });

        return;
      }
    }

    if (showModalForm === 'avatar' || showModalForm === 'cover') {
      changeImg(data);
    }

    if (showModalForm === 'newTweet') {
      addTweet(data);
    }

    setShowModalForm(null);
  };

  useEffect((): void => {
    if (isSubmitSuccessful) {
      reset();
    }

    if (isValidating) {
      clearErrors();
    }
  }, [clearErrors, isSubmitSuccessful, isValidating, reset]);

  const renderBackdrop = (props: RenderModalBackdropProps) => (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black/50" {...props} />
  );

  return (
    <Modal
      className={`modal fixed top-1/2 left-1/2 z-50 flex ${
        showModalForm === 'signup' || showModalForm === 'login' ? 'w-[300px]' : 'w-full min-w-[300px] max-w-[70vw]'
      } -translate-y-1/2 -translate-x-1/2 flex-col items-center rounded-md bg-white p-7 shadow-md`}
      show={!!showModalForm}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title text-center text-lg font-semibold text-black text-opacity-50">
            {showModalForm === 'login' && 'Log In'}
            {showModalForm === 'signup' && 'Sign Up'}
            {showModalForm === 'newTweet' && 'Create new tweet'}
            {showModalForm === 'editTweet' && 'Edit your tweet'}
            {(showModalForm === 'avatar' || showModalForm === 'cover') && `Paste URL for ${showModalForm} image`}
          </div>
          {showModalForm === 'signup' && (
            <button
              className="modal__link text-sm text-black  text-opacity-50 underline-offset-4 hover:underline"
              onClick={() => setShowModalForm('login')}
            >
              Already signed up?
            </button>
          )}
        </div>
        <form className="modal__desc flex w-full flex-col gap-4 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
          {(showModalForm === 'signup' || showModalForm === 'login') && (
            <InputForm form={form} name="username" type="text" placeholder="Nickname" />
          )}
          {(showModalForm === 'signup' || showModalForm === 'login') && (
            <InputForm form={form} name="password" type="password" placeholder="Password" />
          )}
          {showModalForm === 'signup' && (
            <InputForm form={form} name="firstName" type="text" placeholder="First Name" />
          )}
          {showModalForm === 'signup' && <InputForm form={form} name="lastName" type="text" placeholder="Last Name" />}
          {showModalForm === 'signup' && <InputForm form={form} name="location" type="text" placeholder="Location" />}
          {(showModalForm === 'avatar' || showModalForm === 'cover') && (
            <InputForm form={form} name="url" type="text" placeholder="URL" />
          )}
          {(showModalForm === 'newTweet' || showModalForm === 'editTweet') && (
            <InputForm form={form} name="contentTextarea" type="text" placeholder="Write a tweet..." />
          )}
          <Button
            externalStyle="mt-3"
            size="large"
            type="submit"
            color="solid"
            disabled={!isDirty || Boolean(Object.keys(errors).length)}
          >
            {showModalForm === 'login' && 'Log In'}
            {showModalForm === 'signup' && 'Sign Up'}
            {showModalForm === 'newTweet' && 'Create tweet'}
            {showModalForm === 'editTweet' && 'Edit tweet'}
            {(showModalForm === 'avatar' || showModalForm === 'cover') && `Change ${showModalForm}`}
          </Button>
        </form>

        <button className="button__close absolute -top-6 -right-6 h-5 w-5" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
