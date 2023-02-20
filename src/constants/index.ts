export const DB_KEY = 'db';
export const AUTH_KEY = 'auth';

export enum SignUpMsg {
  emptyField = 'emptyField(s)',
  userIsExist = 'user_is_exist',
  success = 'success',
}

export enum LogInMsg {
  cantFindUser = 'cant_find_user_with_such_username_or_password',
  success = 'success',
}
