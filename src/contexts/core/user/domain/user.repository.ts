import {User} from './user.entity'
import {UserCriteria, UserFilter} from './user.criteria'

export abstract class UserRepository {
  abstract findAll(query?: UserCriteria): Promise<User[]>
  abstract findOne(filter?: UserFilter): Promise<User | null>
  abstract count(filter?: UserFilter): Promise<number>
  abstract create(user: User): Promise<void>
  abstract update(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
  abstract clear(): Promise<void>
}
