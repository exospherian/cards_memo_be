export * from './tg';

export interface ITokenData {
  sub: string;
}

export enum AuthProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TELEGRAM = 'TELEGRAM',
  LOGIN = 'LOGIN',
}
