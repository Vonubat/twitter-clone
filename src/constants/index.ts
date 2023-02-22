export const DB_KEY = 'db';
export const AUTH_KEY = 'auth';

export enum TypingSvg {
  guccitterIsWhat = 'https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&duration=5000&color=34495e&multiline=true&width=350&height=100&lines=Guccitter+is+what%E2%80%99s+happening+;and+what+people+are+talking;+about+right+now.',
  lifeIsNotAbout = 'https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&duration=3000&color=34495e&multiline=true&width=300&height=70&lines=Life%E2%80%99s+not+about+a+job%2C;+it%E2%80%99s+about+purpose.',
  weServe = 'https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&duration=2000&color=34495b&multiline=true&width=250&height=70&lines=We+serve+the+public+;conversation.',
}

export enum ValidationMsg {
  cantFindUser = 'Cant find user with such username or password (username === password)',
  userIsExist = 'User with such username is exist',
  empty = 'Field should contain at least 3 chars',
  noSpaces = `Spaces don't allow`,
  success = 'success',
}

export enum Path {
  welcomePage = '/',
  userPage = '/:username',
  userNotFound = 'User not found',
  any = '*',
}
