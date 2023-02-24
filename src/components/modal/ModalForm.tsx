import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-overlays/cjs/Modal';

import closeBtn from '../../assets/icons/close.png';
import { ValidationMsg } from '../../constants';
import { useTwitter } from '../../hooks';
import { CustomFormInputs } from '../../types';
import { Button } from '../ui/Button';
import { InputForm } from '../ui/InputForm';

import { Backdrop } from './Backdrop';

export const ModalForm = (): JSX.Element => {
  const { showModalForm, setShowModalForm, logIn, signUp, changeImg, addTweet, editTweet } = useTwitter();

  const form = useForm<CustomFormInputs>();
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitSuccessful, isDirty, isValidating },
  } = form;

  const handleClose = (): void => setShowModalForm(null);

  const handleFormSubmit = (data: CustomFormInputs): void => {
    if (showModalForm?.type === 'login') {
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

    if (showModalForm?.type === 'signup') {
      const res = signUp(data);

      if (res === ValidationMsg.userIsExist) {
        setError('username', {
          type: 'manual',
          message: ValidationMsg.userIsExist,
        });

        return;
      }
    }

    if (showModalForm?.type === 'avatar' || showModalForm?.type === 'cover') {
      changeImg(data);
    }

    if (showModalForm?.type === 'newTweet') {
      addTweet(data);
    }

    if (showModalForm?.type === 'editTweet') {
      editTweet({ ...data, tweetId: showModalForm.tweetId });
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

  useEffect(() => {
    if (showModalForm?.type === 'editTweet') {
      setValue('contentTextarea', showModalForm.text);
    }

    if (showModalForm?.type === 'newTweet') {
      setValue('contentTextarea', '');
    }
  }, [setValue, showModalForm]);

  return (
    <Modal
      className={`modal fixed top-1/2 left-1/2 z-50 flex ${
        showModalForm?.type === 'signup' || showModalForm?.type === 'login'
          ? 'w-[300px]'
          : 'w-full min-w-[300px] max-w-[70vw]'
      } -translate-y-1/2 -translate-x-1/2 flex-col items-center rounded-md bg-white p-7 shadow-md outline-none`}
      show={!!showModalForm}
      onHide={handleClose}
      renderBackdrop={Backdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title text-center text-lg font-semibold text-black text-opacity-50">
            {showModalForm?.type === 'login' && 'Log In'}
            {showModalForm?.type === 'signup' && 'Sign Up'}
            {showModalForm?.type === 'newTweet' && 'Create new tweet'}
            {showModalForm?.type === 'editTweet' && 'Edit your tweet'}
            {(showModalForm?.type === 'avatar' || showModalForm?.type === 'cover') &&
              `Paste URL for ${showModalForm} image`}
          </div>
          {showModalForm?.type === 'signup' && (
            <button
              className="modal__link text-sm text-black  text-opacity-50 underline-offset-4 hover:underline"
              onClick={() => setShowModalForm({ type: 'login' })}
            >
              Already signed up?
            </button>
          )}
        </div>
        <form className="modal__desc flex w-full flex-col gap-4 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
          {(showModalForm?.type === 'signup' || showModalForm?.type === 'login') && (
            <InputForm form={form} name="username" type="text" placeholder="Nickname" />
          )}
          {(showModalForm?.type === 'signup' || showModalForm?.type === 'login') && (
            <InputForm form={form} name="password" type="password" placeholder="Password" />
          )}
          {showModalForm?.type === 'signup' && (
            <InputForm form={form} name="firstName" type="text" placeholder="First Name" />
          )}
          {showModalForm?.type === 'signup' && (
            <InputForm form={form} name="lastName" type="text" placeholder="Last Name" />
          )}
          {showModalForm?.type === 'signup' && (
            <InputForm form={form} name="location" type="text" placeholder="Location" />
          )}
          {(showModalForm?.type === 'avatar' || showModalForm?.type === 'cover') && (
            <InputForm form={form} name="url" type="text" placeholder="URL" />
          )}
          {(showModalForm?.type === 'newTweet' || showModalForm?.type === 'editTweet') && (
            <InputForm form={form} name="contentTextarea" type="text" placeholder="Write a tweet..." />
          )}
          <Button
            externalStyle="mt-3 self-center"
            size="large"
            type="submit"
            color="solid"
            disabled={!isDirty || Boolean(Object.keys(errors).length)}
          >
            {showModalForm?.type === 'login' && 'Log In'}
            {showModalForm?.type === 'signup' && 'Sign Up'}
            {showModalForm?.type === 'newTweet' && 'Create tweet'}
            {showModalForm?.type === 'editTweet' && 'Edit tweet'}
            {(showModalForm?.type === 'avatar' || showModalForm?.type === 'cover') && `Change ${showModalForm?.type}`}
          </Button>
        </form>
        <button className="button__close absolute -top-6 -right-6 h-5 w-5" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
