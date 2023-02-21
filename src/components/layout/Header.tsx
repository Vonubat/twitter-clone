import logo from '../../assets/icons/logo.png';
import { useTwitter } from '../../hooks';
import { Button } from '../ui/Button';

export const Header = (): JSX.Element => {
  const { ownerId } = useTwitter();

  return (
    <header className="w-screen h-12 flex items-center justify-around">
      <div className="logo__wrapper flex gap-3">
        <img src={logo} alt="logo icon" />
        <h1 className="font-semibold text-sky-500">Guccitter</h1>
      </div>
      <div className="button__wrapper flex gap-3">
        {!ownerId && (
          <Button size="small" type="button" color="transparent">
            Log In
          </Button>
        )}
        <Button size="small" type="button" color="solid">
          {ownerId ? 'Log out' : 'Sign up'}
        </Button>
      </div>
    </header>
  );
};
