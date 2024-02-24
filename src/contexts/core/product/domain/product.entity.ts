import {isDate, isFloat, isString, isUuid} from '../../../../lib/class-attrs'
import {validate2} from '../../../../lib/class-attrs/utils'
import {Nothing} from '../../../../shared/utils'
import {ProductValidationError} from './product-validation.error'

export class Product {
  @isUuid()
  id: string

  @isUuid()
  categoryId: string

  @isString()
  name: string

  @isFloat()
  price: number

  @isString()
  description?: string

  @isDate()
  createdAt: Date

  @isString({optional: true})
  photoPath?: string

  private constructor() {}

  static load(data: Properties<Product>) {
    const entity = new this()

    entity.id = data.id
    entity.categoryId = data.categoryId
    entity.name = data.name
    entity.price = data.price
    entity.description = data.description
    entity.photoPath = data.photoPath
    entity.createdAt = data.createdAt

    return entity as Readonly<Product>
  }

  static create(data: Omit<Properties<Product>, 'createdAt'>): Product | ProductValidationError {
    const product = this.load({...data, createdAt: new Date()})

    // here we would add the CREATED domain event

    return this.validate(product) || product
  }

  static validate(product: Product): ProductValidationError | Nothing {
    const errors = validate2(product)

    if (errors) return new ProductValidationError(errors)

    return Nothing
  }

  update(data: Pick<Properties<Product>, 'name' | 'price' | 'description'>) {
    this.name = data.name
    this.price = data.price
    this.description = data.description

    return Product.validate(this)
  }
}
