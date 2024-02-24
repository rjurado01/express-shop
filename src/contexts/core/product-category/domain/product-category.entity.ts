import {isDate, isString, isUuid, ValidatedClass} from '../../../../lib/class-attrs'
import {validate2} from '../../../../lib/class-attrs/utils'
import {Nothing} from '../../../../shared/utils'
import {ProductCategoryValidationError} from './product-category-validation.error'

export class ProductCategory {
  @isUuid()
  id: string

  @isString()
  name: string

  @isString()
  description?: string

  // @isInteger()
  // readonly productCount: number

  @isDate()
  readonly createdAt: Date

  // METHODS

  private constructor() {}

  static load(data: Properties<ProductCategory>) {
    const entity = new this()

    entity.id = data.id
    entity.name = data.name
    entity.description = data.description

    return entity as Readonly<ProductCategory>
  }

  static create(
    data: Omit<Properties<ProductCategory>, 'createdAt'>,
  ): ProductCategory | ProductCategoryValidationError {
    const product = this.load({...data, createdAt: new Date()})

    // here we would add the CREATED domain event

    return this.validate(product) || product
  }

  static validate(product: ProductCategory): ProductCategoryValidationError | Nothing {
    const errors = validate2(product)

    if (errors) return new ProductCategoryValidationError(errors)

    return Nothing
  }

  update(data: Pick<Properties<ProductCategory>, 'name' | 'description'>) {
    this.name = data.name
    this.description = data.description

    return ProductCategory.validate(this)
  }
}
