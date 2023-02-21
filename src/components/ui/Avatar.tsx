import { useState } from 'react';

import defaultAvatar from '../../assets/default_avatar.png';

type Props = {
  src: string | null;
};

export const Avatar = ({ src }: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = (): void => {
    setIsHovering(true);
  };

  const handleMouseOut = (): void => {
    setIsHovering(false);
  };

  return (
    <div className="avatar__wrapper">
      <img
        className="w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] md:w-[150px] md:h-[150px] lg:w-[210px] lg:h-[210px] rounded-full object-cover border-solid border-4 border-white"
        src={src || defaultAvatar}
        alt="User avatar"
      />
    </div>
  );
};
