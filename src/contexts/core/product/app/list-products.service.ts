import {Service} from 'diod'
import {omit} from '../../../../lib/utils'
import {ProductCriteria} from '../domain/product.criteria'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'
import {Ok} from '../../../../shared/utils'
import {validate2} from '../../../../lib/class-attrs/utils'
import {InvalidClassError, hasErrors} from '../../../../lib/class-attrs/validation/attr-error'

export interface ListProductsView {
  data: Omit<Properties<Product>, 'description'>[]
  meta: {
    totalElements: number
  }
}

@Service()
export class ListProductsService {
  constructor(private readonly repository: ProductRepository) {}

  async run(
    query: ProductCriteria,
  ): Promise<Ok<ListProductsView> | InvalidClassError<ProductCriteria>> {
    const errors = validate2(query)

    if (hasErrors(errors)) return new InvalidClassError(errors)

    const data = await this.repository.findAll(query)
    const count = await this.repository.count(query.filter)

    return new Ok({
      data: data.map(this.mapProductToView),
      meta: {totalElements: count},
    })
  }

  private mapProductToView(product: Product) {
    return omit(product, ['description'])
  }
}
