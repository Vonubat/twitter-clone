export const BASE_URL = 'http://localhost:5000';
export const MINUTE = 60000;

export enum TypingSvg {
  guccitterIsWhat = 'https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&duration=3000&repeat=false&color=34495e&multiline=true&width=350&height=100&lines=Guccitter+is+what%E2%80%99s+happening+;and+what+people+are+talking;+about+right+now.',
  lifeIsNotAbout = 'https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&duration=3000&repeat=false&color=34495e&multiline=true&width=300&height=70&lines=Life%E2%80%99s+not+about+a+job%2C;+it%E2%80%99s+about+purpose.',
  weServe = 'https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&duration=3000&&repeat=false&color=34495b&multiline=true&width=250&height=70&lines=We+serve+the+public+;conversation.',
}

export enum ValidationMsg {
  wrongCredentials = 'Wrong credentials provided',
  userIsExist = 'User with such username is exist',
  empty = 'Field should contains at least 3 chars',
  noSpaces = `Spaces aren't allowed`,
  notOnlySpaces = `Your message can't consist of only spaces`,
  nonValidUrl = 'Non-valid URL-address',
  unauthorized = 'Unauthorized',
  sessionHasExpired = 'Session has expired. Please, authenticate yourself',
}

export enum Path {
  welcomePage = '/',
  userPage = '/:username',
  userNotFound = 'User not found',
  any = '*',
}
