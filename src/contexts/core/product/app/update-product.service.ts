import {Service} from 'diod'

import {Nothing, Ok, neverHere} from '../../../../shared/utils'
import {ProductNotFoundError} from '../domain/product-not-found.error'
import {ProductValidationError} from '../domain/product-validation.error'
import {ProductFilter} from '../domain/product.criteria'
import {ProductRepository} from '../domain/product.repository'
import {
  ClassValidationErrors,
  InvalidClassError,
} from '../../../../lib/class-attrs/validation/attr-error'
import {Product} from '../domain/product.entity'

export class UpdateProductDto {
  readonly id: string
  readonly name: string
  readonly price: number
  readonly info?: string

  constructor(data: Properties<UpdateProductDto>) {
    this.id = data.id
    this.name = data.name
    this.price = data.price
    this.info = data.info
  }
}

@Service()
export class UpdateProductService {
  constructor(private readonly repository: ProductRepository) {}

  async run(
    data: UpdateProductDto,
  ): Promise<Ok<Nothing> | ProductNotFoundError | ProductValidationError> {
    const {id, info, ...updateData} = data
    const filter = new ProductFilter({id})
    const product = await this.repository.findOne(filter)

    if (!product) return new ProductNotFoundError(filter)

    const result = product.update({...updateData, description: info})

    switch (true) {
      case result instanceof ProductValidationError:
        return this.mapErrors(result.errors)

      case result === Nothing:
        break

      default:
        neverHere(result)
    }

    await this.repository.update(product)

    return new Ok(Nothing)
  }

  private mapErrors(
    productErrors: ClassValidationErrors<Product>,
  ): InvalidClassError<UpdateProductDto> {
    return new InvalidClassError({
      name: productErrors.name,
      price: productErrors.price,
      info: productErrors.description, // change the name
    })
  }
}
