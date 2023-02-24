import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { reviver } from '../utils';

export const useStateWithLocalStorage = <T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item: string | null = localStorage.getItem(key);

      if (item) {
        setValue(JSON.parse(item, reviver) as T);
      }
    } catch (e) {
      console.warn(`Error reading localStorage key “${key}”:`, e);
    }
  }, [setValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
