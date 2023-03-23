import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tweet } from '../components';
import { Path } from '../constants';
import { useAppSelector, useGetAllFollowingsQuery, useLazyGetListOfUserTweetsQuery, userSelector } from '../redux';
import { IFollowing } from '../types';

export const FeedPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { owner } = useAppSelector(userSelector);
  const { isError, data: allFollowingUsers } = useGetAllFollowingsQuery();
  const [getTweets] = useLazyGetListOfUserTweetsQuery();
  const [allFollowingUsersWithTweets, setAllFollowingUsersWithTweets] = useState<IFollowing[]>([]);

  useEffect(() => {
    if (!owner && isError) {
      navigate(Path.userNotFound);
    }
  }, [owner, isError, navigate]);

  useEffect(() => {
    if (allFollowingUsers) {
      const fetchTweets = async () => {
        const res = allFollowingUsers.map(async (followingUser) => {
          const user = { ...followingUser };
          const tweets = await getTweets(followingUser.userId).unwrap();

          user.tweets = tweets;

          return user as IFollowing;
        });

        Promise.all(res).then((data) => {
          data.sort((a, b) => {
            const lastTweetA = a.tweets?.[a.tweets.length - 1];
            const lastTweetB = b.tweets?.[b.tweets.length - 1];

            if (!lastTweetA || !lastTweetB) return 0;

            return new Date(lastTweetB.date).getTime() - new Date(lastTweetA.date).getTime();
          });

          setAllFollowingUsersWithTweets(data);
        });
      };

      fetchTweets();
    }
  }, [allFollowingUsers, getTweets]);

  return (
    <main className="page-not-found__wrapper flex grow animate-bg justify-center overflow-hidden bg-gradient-to-r from-orange-50 to-orange-300 bg-[length:200%_200%]">
      <div className="tweets__container flex max-w-lg flex-col gap-5 p-5">
        {allFollowingUsersWithTweets &&
          allFollowingUsersWithTweets.map((followingUser) => {
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
