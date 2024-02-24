import {isDate, isString, isUuid} from '../../../../lib/class-attrs'
import {validate2} from '../../../../lib/class-attrs/utils'
import {Nothing} from '../../../../shared/utils'
import {UserValidationError} from './user-validation.error'

export class User {
  @isUuid()
  id: string

  @isString()
  name: string

  @isString()
  email: string

  @isDate()
  createdAt: Date = new Date()

  private constructor() {}

  static load(data: Properties<User>) {
    const entity = new this()

    entity.id = data.id
    entity.name = data.name
    entity.email = data.email

    return entity as Readonly<User>
  }

  static create(data: Omit<Properties<User>, 'createdAt'>): User | UserValidationError {
    const product = this.load({...data, createdAt: new Date()})

    // here we would add the CREATED domain event

    return this.validate(product) || product
  }

  static validate(product: User): UserValidationError | Nothing {
    const errors = validate2(product)

    if (errors) return new UserValidationError(errors)

    return Nothing
  }

  update(data: Pick<Properties<User>, 'name'>) {
    this.name = data.name

    return User.validate(this)
  }
}
