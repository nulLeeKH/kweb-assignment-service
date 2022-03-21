import { EntityRepository, getConnection, Repository } from 'typeorm'
import { Token } from '../domain/token'
import logger from "../util/logger";

// import logger from "../util/logger";

@EntityRepository(Token)
class TokenRepository extends Repository<Token> {
  add(userId: number, serial: string): Promise<Token> {
    const newToken = new Token()
    newToken.userId = userId
    newToken.serial = serial
    return this.save(newToken)
  }

  check(serial: string): Promise<number | undefined> {
    return this.createQueryBuilder('token')
      .where('token.serial = :serial', { serial: serial })
      .getOneOrFail()
      .then((token: Token) => {
        const now: Date = new Date()
        logger.debug(Number(token.deletedAt))
        logger.debug(Number(now))
        if (Number(token.deletedAt) < Number(now)) return undefined
        return this.update({serial: serial}, {deletedAt: now})
          .then(() => {
            return Number(token.userId)
          })
          .catch(() => {
            return undefined
          })
      })
      .catch(() => {
        return undefined
      })
  }
}

let TokenRepo: TokenRepository

export function refreshTokenRepo(): void {
  const conn = getConnection()
  TokenRepo = conn.getCustomRepository(TokenRepository)
}

export function getTokenRepo(): TokenRepository {
  return TokenRepo
}
