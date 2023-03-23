import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { Path } from '../../constants';
import {
  setModalForm,
  useAppDispatch,
  useAppSelector,
  useLogoutUserMutation,
  userSelector,
  useVerifyUserQuery,
} from '../../redux';
import { Button } from '../ui/Button';
import { Loading } from '../ui/indicators/Loading';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { owner } = useAppSelector(userSelector);
  const { isLoading, isSuccess, isError } = useVerifyUserQuery(null);
  const [logOut] = useLogoutUserMutation();

  const handleLogIn = (): void => {
    dispatch(setModalForm({ type: 'login' }));
  };

  const handleSignUp = (): void => {
    dispatch(setModalForm({ type: 'signup' }));
  };

  const handleLogOut = async (): Promise<void> => {
    await logOut();
  };

  const isLoggedIn = !!owner;

  return (
    <header className="flex h-12 w-full items-center justify-around">
      <div className="flex gap-8">
        <NavLink to={Path.welcomePage}>
          <div className="logo__wrapper flex gap-3">
            <Logo className="h-7 w-7" />
            <h1 className="font-semibold text-sky-500">Guccitter</h1>
          </div>
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink to={`/${owner?.username}`}>
              <div className="logo__wrapper flex gap-3">
                <h1 className="font-semibold text-sky-500">Profile</h1>
              </div>
            </NavLink>
            <NavLink to={Path.feedPage}>
              <div className="logo__wrapper flex gap-3">
                <h1 className="font-semibold text-sky-500">Feed</h1>
              </div>
            </NavLink>
          </>
        )}
      </div>
      <div className="button__wrapper flex gap-3">
        {isLoading && <Loading type="content" />}
        {(isSuccess || isError) && (
          <>
            <Button
              externalStyle={owner ? 'invisible' : 'visible'}
              size="small"
              type="button"
              color="transparent"
              onClick={handleLogIn}
            >
              Log In
            </Button>
            <Button size="small" type="button" color="solid" onClick={owner ? handleLogOut : handleSignUp}>
              {owner ? 'Log out' : 'Sign up'}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
