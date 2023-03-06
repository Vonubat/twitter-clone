import { ValidationMsg } from '../constants';
import { isFetchBaseQueryError, isGenericResponse } from '../types';

export const findErrorInResponse = (errorEntity: unknown, certainError: ValidationMsg): boolean => {
  if (isFetchBaseQueryError(errorEntity) && isGenericResponse(errorEntity.data)) {
    const { message, error } = errorEntity.data;

    const isErrorExist = Boolean(error);
    const isMessageExist = Boolean(message);

    if (!isMessageExist && !isErrorExist) {
      return false;
    }

    if (isErrorExist) {
      return error === certainError;
    }

    const isMessageIsString = typeof message === 'string';

    if (isMessageIsString) {
      return message === certainError;
    }

    const isMessageIsArray = Array.isArray(message);

    if (isMessageIsArray) {
      return message.some((errorMsg) => errorMsg === certainError);
    }
  }

  return false;
};
