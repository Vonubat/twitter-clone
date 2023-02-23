import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal, { RenderModalBackdropProps } from 'react-overlays/cjs/Modal';

import closeBtn from '../../assets/icons/close.png';
import { useTwitter } from '../../hooks';
import { CustomFormInputs } from '../../types';
import { Button } from '../ui/Button';
import { InputForm } from '../ui/InputForm';

export const ModalEditor = (): JSX.Element => {
  const form = useForm<CustomFormInputs>();
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = form;
  const { showEditorModal, setShowEditorModal, addTweet } = useTwitter();

  const handleClose = (): void => setShowEditorModal(null);

  const handleFormSubmit = (data: CustomFormInputs): void => {
    if (showEditorModal === 'new') {
      addTweet(data);
    }

    setShowEditorModal(null);
  };

  const resetForm: () => void = useCallback((): void => {
    reset({ contentTextarea: '' });
  }, [reset]);

  useEffect((): void => {
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, resetForm]);

  const renderBackdrop = (props: RenderModalBackdropProps) => (
    <div className="fixed top-0 right-0 bottom-0  left-0 z-50 bg-black/50" {...props} />
  );

  return (
    <Modal
      className="modal fixed top-1/2 left-1/2 z-50 flex w-full max-w-[70vw] -translate-y-1/2 -translate-x-1/2 flex-col items-center rounded-md bg-white p-7 shadow-md"
      show={!!showEditorModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <>
        <div className="modal__header w-full">
          <div className="modal__title text-center text-lg font-semibold text-black text-opacity-50">
            {showEditorModal === 'new' ? 'Create new tweet' : 'Edit your tweet'}
          </div>
        </div>
        <form className="modal__desc flex w-full flex-col gap-4 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
          <InputForm form={form} name="contentTextarea" type="text" placeholder="Write a tweet..." />
          <Button
            externalStyle="mt-3 self-center"
            size="large"
            type="submit"
            color="solid"
            disabled={!isDirty || Boolean(Object.keys(errors).length)}
          >
            {showEditorModal === 'new' ? 'Create tweet' : 'Edit tweet'}
          </Button>
        </form>
        <button className="button__close absolute -top-6 -right-6 h-5 w-5" onClick={handleClose}>
          <img src={closeBtn} alt="close btn" />
        </button>
      </>
    </Modal>
  );
};
