import * as randToken from 'rand-token'
import * as jwt from 'jsonwebtoken'
import { ITypeTokenPayload } from '../type/common'
import { ITypeTokenData } from '../type/auth'
import { JwtPayload } from 'jsonwebtoken'
import { User } from '../domain/auth'
import secret from './secret'
import { config as envConfig } from 'dotenv'
envConfig()

export function sign(user: User): ITypeTokenData {
  const payload: ITypeTokenPayload = {
    id: Number(user.id),
    un: String(user.username),
    nm: String(user.name),
    no: String(user.uniqueNo),
    tp: String(user.type)
  }

  return {
    access: jwt.sign(payload, String(secret.jwt), {
      algorithm: 'HS256',
      expiresIn: String(process.env.ACCESS_TOKEN_LIFE) + 'm',
      issuer: process.env.JWT_ISSUER
    }),
    refresh: randToken.uid(255)
  }
}

export function verify(token: string): JwtPayload | string {
  let decoded: JwtPayload | string
  try {
    decoded = jwt.verify(token, String(secret.jwt))
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      return 'expired'
    } else if (err.message === 'invalid token') {
      return 'invalid'
    } else {
      return 'unknown'
    }
  }
  return decoded
}
