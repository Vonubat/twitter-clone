import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import defaultAvatart from '../../assets/default_avatar.png';
import { useDebounce, useTwitter } from '../../hooks';
import { IUser } from '../../types';

export const Search = (): JSX.Element => {
  const { users } = useTwitter();
  const [foundedUsers, setFoundedUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const searchUsers = useCallback((): void => {
    const filteredUsers = users.filter((user) => {
      const value = searchValue.toLowerCase().trim();
      const username = user.username.toLowerCase();
      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();

      const isMatch = username.includes(value) || firstName.includes(value) || lastName.includes(value);

      return isMatch;
    });

    setFoundedUsers(filteredUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useEffect(() => {
    searchUsers();
  }, [debouncedSearchValue, searchUsers]);

  return (
    <div className="w-2/3 flex justify-center animate-append">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
          <div className="block text-gray-700 text-lg font-semibold py-2 px-2">Let&apos;s find new friends</div>
          <div className="flex items-center bg-gray-200 rounded-md">
            <div className="pl-2">
              <svg
                className="fill-current text-gray-500 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className="heroicon-ui"
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                />
              </svg>
            </div>
            <input
              className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
              id="search"
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className="py-3 text-sm">
            {foundedUsers.map((user) => {
              return (
                <NavLink key={user.id} to={`/${user.username}`}>
                  <div className="flex items-center cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                    <div className="flex-grow font-medium px-2">{`${user.firstName} ${user.lastName} (@${user.username})`}</div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.avatar ? user.avatar : defaultAvatart}
                      alt="Rounded avatar"
                    />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
