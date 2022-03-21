import * as randToken from 'rand-token'
import * as jwt from 'jsonwebtoken'
import {
  ITypeTokenPayload,
  ITypeTokenData} from "../type/auth";
import {JwtPayload} from "jsonwebtoken";
import {User} from "../domain/auth";
import { getTokenRepo } from "../repository/token";
import { config as envConfig } from 'dotenv'
envConfig()

export function sign (user: User): ITypeTokenData {
  const payload: ITypeTokenPayload = {
    username: String(user.username),
    name: String(user.name),
    uniqueNo: String(user.uniqueNo),
    type: String(user.type)
  }

  return{
    access: jwt.sign(payload, String(process.env.JWT_SECRET), {
      algorithm : "HS256",
      expiresIn : String(process.env.ACCESS_TOKEN_LIFE) + 'm',
      issuer : "kweb"
    }),
    refresh: randToken.uid(255)
  };
}

export function verify(token: string): JwtPayload | string {
  let decoded: JwtPayload | string;
  try {
    decoded = jwt.verify(token, String(process.env.JWT_SECRET));
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      return 'expired';
    } else if (err.message === 'invalid token') {
      return 'invalid';
    } else {
      return 'unknown';
    }
  }
  return decoded;
}
