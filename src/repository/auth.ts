import { EntityRepository, getConnection, Repository } from 'typeorm'
import { User, Token } from '../domain/auth'
import { ITypeSignUpData } from '../type/auth'
// import logger from "../util/logger";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  add(data: ITypeSignUpData): Promise<User> {
    const newUser = new User()
    newUser.username = data.username
    newUser.password = data.password
    newUser.salt = data.salt
    newUser.name = data.name
    newUser.uniqueNo = data.uniqueNo
    newUser.type = data.type
    return this.save(newUser)
  }

  check(username: string): Promise<boolean> {
    return this.createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .getOneOrFail()
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  }

  findByUsername(username: string): Promise<User | undefined> {
    return this.createQueryBuilder('user').where('user.username = :username', { username: username }).getOneOrFail()
  }

  findById(userId: number): Promise<User | undefined> {
    return this.createQueryBuilder('user').where('user.id = :userId', { userId: userId }).getOneOrFail()
  }

  signIn(username: string, password: string): Promise<User | boolean> {
    return this.createQueryBuilder('user')
      .where('user.username = :username AND user.password = :password', { username: username, password: password })
      .getOneOrFail()
      .then((user: User) => {
        return user
      })
      .catch(() => {
        return false
      })
  }
}

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
        if (Number(token.deletedAt) < Number(now)) return undefined
        return this.update({ serial: serial }, { deletedAt: now })
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

let UserRepo: UserRepository

export function refreshUserRepo(): void {
  const conn = getConnection()
  UserRepo = conn.getCustomRepository(UserRepository)
}

export function getUserRepo(): UserRepository {
  return UserRepo
}

let TokenRepo: TokenRepository

export function refreshTokenRepo(): void {
  const conn = getConnection()
  TokenRepo = conn.getCustomRepository(TokenRepository)
}

export function getTokenRepo(): TokenRepository {
  return TokenRepo
}
