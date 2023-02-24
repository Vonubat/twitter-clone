import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import defaultAvatar from '../../assets/default_avatar.png';
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
    <div className="flex w-2/3 animate-append justify-center">
      <div className="w-full max-w-md">
        <div className="mb-4 rounded-lg bg-white px-3 py-2 shadow-md">
          <div className="block py-2 px-2 text-lg font-semibold text-gray-700">Let&apos;s find new friends</div>
          <div className="flex items-center rounded-md bg-gray-200">
            <div className="pl-2">
              <svg
                className="h-6 w-6 fill-current text-gray-500"
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
              className="w-full rounded-md bg-gray-200 py-2 px-2 leading-tight text-gray-700 focus:outline-none"
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
                  <div className="my-2 flex cursor-pointer items-center  rounded-md px-2 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-400">
                    <div className="flex-grow px-2 font-medium">{`${user.firstName} ${user.lastName} (@${user.username})`}</div>
                    <img className="h-10 w-10 rounded-full" src={user.avatar || defaultAvatar} alt="Rounded avatar" />
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
