import {NotFoundError} from '../../shared/domain/not-found.error'
import {ProductCategoryFilter} from './product-category.criteria'

export class ProductCategoryNotFoundError extends NotFoundError {
  constructor(filter: ProductCategoryFilter) {
    super('ProductCategoryNotFound', filter)
  }
}
