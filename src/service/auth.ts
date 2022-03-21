import logger from '../util/logger'
import { getUserRepo } from '../repository/auth'
import {ITypeSignUpData} from "../type/auth";
import {User} from "../domain/auth";
// import { PotentialUser } from '../domain/landing'
// import {ITypeLstResBody} from "../type/sample";

export async function addUser(data: ITypeSignUpData): Promise<boolean> {
  try {
    if (await getUserRepo().check(data.username)) return false

    await getUserRepo().add(data)

    return true
  } catch (e: any) {
    logger.error(e.stack)
    return false
  }
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  try {
    return await getUserRepo().findByUsername(username)
  } catch (e: any) {
    logger.error(e.stack)
  }
  return undefined
}

export async function findUserById(userId: number): Promise<User | undefined> {
  try {
    return await getUserRepo().findById(userId)
  } catch (e: any) {
    logger.error(e.stack)
  }
  return undefined
}
