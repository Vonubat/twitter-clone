import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { owner } = useAppSelector(userSelector);
  const isLoggedIn = !!owner;
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
    navigate(Path.welcomePage);
  };

  useEffect(() => {
    if (pathname === Path.feedPage && !isLoggedIn && isError) {
      navigate(Path.userNotFound);
    }
  }, [isError, pathname, isLoggedIn, navigate]);

  return (
    <header className="flex h-12 w-full items-center justify-around">
      <div className="flex gap-5">
        <div className="logo__wrapper flex gap-3">
          <NavLink to={Path.welcomePage}>
            <Logo className="h-7 w-7" />
          </NavLink>
          <NavLink to={isLoggedIn ? `/${owner.username}` : Path.welcomePage}>
            <h1 className="font-semibold text-sky-500">Guccitter</h1>
          </NavLink>
        </div>
        {isLoggedIn && (
          <NavLink to={Path.feedPage}>
            <h2 className="font-semibold text-sky-500">Feed</h2>
          </NavLink>
        )}
      </div>
      <div className="button__wrapper flex gap-3">
        {isLoading && <Loading type="content" />}
        {(isSuccess || isError) && (
          <>
            {!isLoggedIn && (
              <Button size="small" type="button" color="transparent" onClick={handleLogIn}>
                Log In
              </Button>
            )}
            <Button size="small" type="button" color="solid" onClick={isLoggedIn ? handleLogOut : handleSignUp}>
              {isLoggedIn ? 'Log out' : 'Sign up'}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
