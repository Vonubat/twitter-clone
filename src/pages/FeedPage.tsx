import { skipToken } from '@reduxjs/toolkit/dist/query';

import { Tweet } from '../components';
import { useAppSelector, useGetFeedListQuery, userSelector } from '../redux';

export const FeedPage = (): JSX.Element => {
  const { owner } = useAppSelector(userSelector);
  const { data: feedList } = useGetFeedListQuery(owner ?? skipToken, { refetchOnMountOrArgChange: true });

  return (
    <main className="page-not-found__wrapper flex grow animate-bg justify-center overflow-hidden bg-gradient-to-r from-orange-50 to-orange-300 bg-[length:200%_200%]">
      <div className="tweets__container flex max-w-lg flex-col gap-5 p-5">
        {feedList &&
          feedList.map((followingUser) => {
            if (followingUser.tweets?.length) {
              return followingUser.tweets.map((tweet) => (
                <Tweet key={tweet.tweetId} tweet={tweet} user={followingUser} />
              ));
            }

            return null;
          })}
      </div>
    </main>
  );
};
