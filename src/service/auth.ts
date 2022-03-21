import logger from '../util/logger'
import {
  getUserRepo,
  getTokenRepo} from '../repository/auth'
import {ITypeSignUpData} from "../type/auth";
import {User} from "../domain/auth";
// import { PotentialUser } from '../domain/landing'
// import {ITypeLstResBody} from "../type/sample";

class UserService {
  async addUser(data: ITypeSignUpData): Promise<boolean> {
    try {
      if (await getUserRepo().check(data.username)) return false

      await getUserRepo().add(data)

      return true
    } catch (e: any) {
      logger.error(e.stack)
      return false
    }
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    try {
      return await getUserRepo().findByUsername(username)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async findUserById(userId: number): Promise<User | undefined> {
    try {
      return await getUserRepo().findById(userId)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }
}

class TokenService {
  async addToken(userId: number, serial: string): Promise<boolean> {
    try {
      return await getTokenRepo().add(userId, serial)
        .then(() => {
          return true
        })
    } catch (e: any) {
      logger.error(e.stack)
      return false
    }
  }

  async checkToken(serial: string): Promise<number | undefined> {
    try {
      return getTokenRepo().check(serial)
        .then((result: number | undefined) => {
          if (undefined == result) return undefined
          else return result
        })
    } catch (e: any) {
      logger.error(e.stack)
      return undefined
    }
  }
}

const userService = new UserService()
const tokenService = new TokenService()

export {userService, tokenService}
