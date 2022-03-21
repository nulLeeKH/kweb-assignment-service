import { ITypeId, ITypeUser } from './common'

interface ITypeUserCert {
  password: string
}

export interface ITypeAccessToken {
  access: string
}

export interface ITypeRefreshToken {
  refresh: string
}

export interface ITypeTokenData extends ITypeAccessToken, ITypeRefreshToken {}

export interface ITypeSignInData {
  username: string
  password: string
}

export interface ITypeSignUpData extends ITypeUser, ITypeUserCert {
  salt: string
}

export interface ITypeTokenPayload extends ITypeUser, ITypeId {}

export interface ITypeSignUpReqBody extends ITypeUser, ITypeUserCert {}
export interface ITypeSignUpResBody {
  username: string
}

export interface ITypeSignInReqBody extends ITypeSignInData {}
export interface ITypeSignInResBody extends ITypeTokenData {}

export interface ITypeRefreshReqBody extends ITypeRefreshToken {}
export interface ITypeRefreshResBody extends ITypeTokenData {}
