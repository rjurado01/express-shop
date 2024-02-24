import {ClassValidationErrors} from '../../../../lib/class-attrs/validation/attr-error'
import {User} from './user.entity'

export class UserValidationError {
  constructor(public errors: ClassValidationErrors<User>) {}
}
