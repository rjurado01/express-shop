import {NotFoundError} from '../../shared/domain/not-found.error'
import {ProductFilter} from './product.criteria'

export class ProductNotFoundError extends NotFoundError {
  constructor(filter: ProductFilter) {
    super('ProductNotFound', filter)
  }
}
