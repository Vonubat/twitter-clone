import { Navigate, useParams } from 'react-router-dom';

import { Avatar, Banner, ControlBar, Cover, Tweet, UserInfo } from '../components';
import { Path } from '../constants';
import { useTwitter } from '../hooks';
import { IUser } from '../types';

export const UserPage = (): JSX.Element => {
  const { username } = useParams();
  const { users, ownerId } = useTwitter();

  const user: IUser | undefined = users.find(({ username: ref }) => username === ref);
  // const isOwner = Boolean(users.find(({ id }) => id === ownerId));

  return !user ? (
    <Navigate to={Path.userNotFound} />
  ) : (
    <main className="user-page__wrapper animate-bg bg-[length:200%_200%] bg-gradient-to-r from-slate-50 to-slate-300 grow flex flex-col">
      <div className="cover-avatar__wrapper relative">
        <Cover src={user.bgImage} />
        <Avatar src={user.avatar} />
      </div>
      <ControlBar user={user} />
      <div className="content__wrapper flex items-center md:items-start flex-col md:flex-row mt-3 md:mt-8 lg:mt-16 pb-5 gap-8">
        <div className="user-info__container ml-0 md:ml-[13%] ">
          <UserInfo user={user} />
        </div>
        <div className="tweets__container flex flex-col gap-px max-w-lg p-2 md:p-0 ml-0 lg:ml-[10%]">
          {user.tweets.map(({ tweetId }, index) => (
            <Tweet key={tweetId} user={user} currentTweetIndex={index} />
          ))}
        </div>
        <div className="banner__container hidden xl:block">{!ownerId && <Banner />}</div>
      </div>
    </main>
  );
};
