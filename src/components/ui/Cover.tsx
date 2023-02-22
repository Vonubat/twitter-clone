import defaultCover from '../../assets/default_cover.png';

type Props = {
  src: string | null;
};

export const Cover = ({ src }: Props): JSX.Element => {
  return <img className="w-full max-h-[500px] object-cover" src={src || defaultCover} alt="User cover" />;
};
