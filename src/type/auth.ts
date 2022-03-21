interface ITypeUserData {
  username: string,
  name: string,
  uniqueNo: string,
  type: string,
}

interface ITypeUserCertData {
  password: string,
}

export interface ITypeAccessToken {
  access: string
}

export interface ITypeRefreshToken {
  refresh: string
}

export interface ITypeTokenData extends ITypeAccessToken, ITypeRefreshToken {}

export interface ITypeSignInData {
  username: string,
  password: string
}

export interface ITypeSignUpData extends ITypeUserData, ITypeUserCertData {
  salt: string
}

export interface ITypeTokenPayload extends ITypeUserData {}

export interface ITypeSignUpReqBody extends ITypeUserData, ITypeUserCertData {}
export interface ITypeSignUpResBody {
  username: string
}

export interface ITypeSignInReqBody extends ITypeSignInData {}
export interface ITypeSignInResBody extends ITypeTokenData {}

export interface ITypeRefreshReqBody extends ITypeRefreshToken {}
export interface ITypeRefreshResBody extends ITypeTokenData {}
