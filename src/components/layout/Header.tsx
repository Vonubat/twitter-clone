import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { Path } from '../../constants';
import { useTwitter } from '../../hooks';
import { setModalForm, useAppDispatch } from '../../redux';
import { Button } from '../ui/Button';

export const Header = (): JSX.Element => {
  const { ownerId, logOut } = useTwitter();
  const dispatch = useAppDispatch();

  const handleLogIn = (): void => {
    dispatch(setModalForm({ type: 'login' }));
  };

  const handleSignUp = (): void => {
    dispatch(setModalForm({ type: 'signup' }));
  };

  const handleLogOut = (): void => {
    logOut();
  };

  return (
    <header className="flex h-12 w-full items-center justify-around">
      <NavLink to={Path.welcomePage}>
        <div className="logo__wrapper flex gap-3">
          <Logo className="h-7 w-7" />
          <h1 className="font-semibold text-sky-500">Guccitter</h1>
        </div>
      </NavLink>
      <div className="button__wrapper flex gap-3">
        <Button
          externalStyle={ownerId ? 'invisible' : ' visible'}
          size="small"
          type="button"
          color="transparent"
          onClick={handleLogIn}
        >
          Log In
        </Button>
        <Button size="small" type="button" color="solid" onClick={ownerId ? handleLogOut : handleSignUp}>
          {ownerId ? 'Log out' : 'Sign up'}
        </Button>
      </div>
    </header>
  );
};
