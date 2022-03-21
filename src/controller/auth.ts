import logger, { loggedController } from '../util/logger'
import {
  ITypeSignUpData,
  ITypeSignUpReqBody,
  ITypeSignUpResBody,
  ITypeSignInReqBody,
  ITypeSignInResBody,
  ITypeRefreshReqBody,
  ITypeRefreshResBody,
  ITypeSignInData,
  ITypeRefreshToken,
  ITypeTokenData
} from '../type/auth'
import {userService, tokenService} from '../service/auth'
import { digestPassword } from '../util/digester'
import {sign} from '../util/jwt'
import {User} from "../domain/auth";

// import { HttpException } from '../middleware/errorHandler';

class authControllerClass {
  @loggedController('auth', 'su')
  async suController(body: ITypeSignUpReqBody): Promise<ITypeSignUpResBody | string> {
    try {
      const data: ITypeSignUpData = <ITypeSignUpData>body
      const digestResult = digestPassword(data.password, undefined)
      data.password = digestResult[0]
      data.salt = digestResult[1]
      const code = await userService.addUser(data)
      if (code) {
        return { username: data.username }
      } else {
        return 'err'
      }
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }

  @loggedController('auth', 'si')
  async siController(body: ITypeSignInReqBody): Promise<ITypeSignInResBody | string> {
    try {
      const data: ITypeSignInData = <ITypeSignInData>body
      const user = await userService.findUserByUsername(data.username)
      if (undefined == user) return 'err'

      const digestResult = digestPassword(data.password, user.salt)
      if (digestResult[0] != user.password) return 'err';

      const token: ITypeTokenData = await sign(user)

      await tokenService.addToken(Number(user.id), token.refresh)

      return token
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }

  @loggedController('auth', 'rf')
  async rfController(body: ITypeRefreshReqBody): Promise<ITypeRefreshResBody | string> {
    try {
      const data: ITypeRefreshToken = <ITypeRefreshToken>body
      const userId = await tokenService.checkToken(data.refresh)
      if (undefined == userId) return 'err'

      const user: User | undefined = await userService.findUserById(Number(userId))
      if (undefined == user) return 'err'

      const token: ITypeTokenData = await sign(user)

      await tokenService.addToken(Number(user.id), token.refresh)

      return token
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }
}

const authController = new authControllerClass()
export default authController
