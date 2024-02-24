import {NotFoundError} from '../../shared/domain/not-found.error'
import {UserFilter} from './user.criteria'

export class UserNotFoundError extends NotFoundError {
  constructor(filter: UserFilter) {
    super('UserNotFound', filter)
  }
}
