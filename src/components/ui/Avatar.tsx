import defaultAvatar from '../../assets/default_avatar.png';

type Props = {
  src: string | null;
};

export const Avatar = ({ src }: Props): JSX.Element => {
  return (
    <img
      className="absolute w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px] lg:w-[210px] lg:h-[210px] -bottom-[35px] sm:-bottom-[55px] md:-bottom-[75px] lg:-bottom-[105px] left-[13%] rounded-full object-cover border-solid border-4 border-white"
      src={src || defaultAvatar}
      alt="User avatar"
    />
  );
};
