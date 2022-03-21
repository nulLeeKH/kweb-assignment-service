import logger from '../util/logger'
import { getTokenRepo } from '../repository/token'
// import { PotentialUser } from '../domain/landing'
// import {ITypeLstResBody} from "../type/sample";

export async function addToken(userId: number, serial: string): Promise<boolean> {
  try {
    return await getTokenRepo().add(userId, serial)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  } catch (e: any) {
    logger.error(e.stack)
    return false
  }
}

export async function checkToken(serial: string): Promise<number | undefined> {
  try {
    return getTokenRepo().check(serial)
      .then((result: number | undefined) => {
        if (undefined == result) return undefined
        else return result
      })
      .catch(() => {
        return undefined
      })
  } catch (e: any) {
    logger.error(e.stack)
    return undefined
  }
}

