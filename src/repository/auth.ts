import { EntityRepository, getConnection, Repository } from 'typeorm'
import { User } from '../domain/auth'
import { ITypeSignUpData } from "../type/auth";

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
    return this.createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .getOneOrFail()
  }

  findById(userId: number): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .where('user.id = :userId', { userId: userId })
      .getOneOrFail()
  }

  signIn(username: string, password: string): Promise<User | boolean> {
    return this.createQueryBuilder('user')
      .where('user.username = :username AND user.password = :password',
        { username: username, password: password})
      .getOneOrFail()
      .then((user: User) => {
        return user
      })
      .catch(() => {
        return false
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
