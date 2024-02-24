import {Service} from 'diod'
import {UserFilter} from '../domain/user.criteria'
import {User} from '../domain/user.entity'
import {UserRepository} from '../domain/user.repository'
import {UserNotFoundError} from '../domain/user-not-found.error'

export interface ShowUserView extends Properties<User> {}

@Service()
export class ShowUserService {
  constructor(private readonly repository: UserRepository) {}

  async run(filter: UserFilter): Promise<ShowUserView | UserNotFoundError> {
    const user = await this.repository.findOne(filter)

    if (!user) return new UserNotFoundError(filter)

    return user
  }
}
