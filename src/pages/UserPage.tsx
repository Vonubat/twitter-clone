import { Navigate, useParams } from 'react-router-dom';

import { Path } from '../constants';
import { useTwitter } from '../hooks';
import { IUser } from '../types';

export const UserPage = (): JSX.Element => {
  const { username } = useParams();
  const { users } = useTwitter();

  const isExistUserInDb: IUser | undefined = users.find(({ username: ref }) => username === ref);

  return (
    <>
      {!isExistUserInDb ? <Navigate to={Path.userNotFound} /> : null}
      <main className="user-page__wrapper animate-bg bg-[length:200%_200%] bg-gradient-to-r from-sky-50 to-sky-500 grow flex justify-center items-center md:items-start flex-col md:flex-row px-5 py-10 gap-20">
        User page
      </main>
    </>
  );
};
