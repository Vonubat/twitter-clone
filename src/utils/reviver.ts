export const reviver = <T>(key: string, value: T): Date | T => {
  if (key === 'date' || key === 'joined') {
    return new Date(value as string);
  }

  return value;
};
