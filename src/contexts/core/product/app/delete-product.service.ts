import {Service} from 'diod'

import {Nothing, Ok} from '../../../../shared/utils'
import {ProductNotFoundError} from '../domain/product-not-found.error'
import {ProductFilter} from '../domain/product.criteria'
import {ProductRepository} from '../domain/product.repository'

export class DeleteProductDto {
  readonly id: string

  constructor(data: Properties<DeleteProductDto>) {
    this.id = data.id
  }
}

@Service()
export class DeleteProductService {
  constructor(private readonly repository: ProductRepository) {}

  async run(dto: DeleteProductDto): Promise<Ok<Nothing> | ProductNotFoundError> {
    const filter = new ProductFilter({id: dto.id})
    const product = await this.repository.findOne(filter)

    if (!product) return new ProductNotFoundError(filter)

    await this.repository.delete(product)

    return new Ok(Nothing)
  }
}
