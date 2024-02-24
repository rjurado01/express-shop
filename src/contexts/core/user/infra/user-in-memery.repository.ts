import {Service} from 'diod'
import {InMemoryRepository} from '../../shared/infra/in-memory.repository'
import {UserNotFoundError} from '../domain/user-not-found.error'
import {UserCriteria, UserFilter} from '../domain/user.criteria'
import {User} from '../domain/user.entity'
import {UserRepository} from '../domain/user.repository'
import {seedUsers} from '../../shared/infra/in-memory-seed'

@Service()
export class UserInMemeoryRepository
  extends InMemoryRepository<User, UserCriteria>
  implements UserRepository
{
  constructor() {
    super()

    this.items = seedUsers
  }

  protected applyFilter(filter: UserFilter, users: User[]) {
    return users.filter(item => {
      const id = !filter?.id || item.id === filter.id

      const email = !filter?.email || item.email.toLowerCase() === filter.email.toLowerCase()

      return id && email
    })
  }

  protected notFound(filter: UserFilter) {
    throw new UserNotFoundError(filter)
  }
}
