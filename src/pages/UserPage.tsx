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
      <div>User page</div>
    </>
  );
};
