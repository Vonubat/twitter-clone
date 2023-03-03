import { Navigate, useParams } from 'react-router-dom';

import { Avatar, Banner, ControlBar, Cover, Loading, Tweet, UserInfo } from '../components';
import { Path } from '../constants';
import { useGetUserQuery } from '../redux';

export const UserPage = (): JSX.Element => {
  const ownerId = null;
  const { username } = useParams();
  const { data: user, isSuccess } = useGetUserQuery(username as string);

  if (isSuccess) {
    return !user ? (
      <Navigate to={Path.userNotFound} />
    ) : (
      <main className="user-page__wrapper flex grow animate-bg flex-col bg-gradient-to-r from-slate-50 to-slate-300 bg-[length:200%_200%]">
        <div className="cover-avatar__wrapper relative">
          <Cover src={user.bgImage} />
          <Avatar src={user.avatar} />
        </div>
        <ControlBar user={user} />
        <div className="content__wrapper mt-3 flex flex-col items-center gap-8 pb-5 md:mt-8 md:flex-row md:items-start lg:mt-16">
          <div className="user-info__container ml-0 md:ml-[13%] ">
            <UserInfo user={user} />
          </div>
          <div className="tweets__container ml-0 flex max-w-lg flex-col gap-px p-2 md:p-0 lg:ml-[10%]">
            {user.tweets.map(({ tweetId }, index) => (
              <Tweet key={tweetId} user={user} currentTweetIndex={index} />
            ))}
          </div>
          <div className="banner__container hidden xl:block">{!ownerId && <Banner />}</div>
        </div>
      </main>
    );
  }

  return <Loading type="page" />;
};
