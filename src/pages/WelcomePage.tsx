import { Search } from '../components';
import { TypingSvg } from '../constants';

export const WelcomePage = (): JSX.Element => {
  return (
    <main className="welcome-page__wrapper animate-bg bg-[length:200%_200%] bg-gradient-to-r from-sky-50 to-sky-500 grow flex justify-center items-center md:items-start flex-col md:flex-row px-5 py-10 gap-20">
      <div className="typing-svg__wrapper flex flex-col items-start gap-20 w-[350px] h-[400px] ">
        <img src={TypingSvg.guccitterIsWhat} alt="Typing SVG (Gucciter is what)" />
        <img src={TypingSvg.lifeIsNotAbout} alt="Typing SVG (Life is not about)" />
        <img src={TypingSvg.weServe} alt="Typing SVG (We serve)" />
      </div>
      <Search />
    </main>
  );
};
