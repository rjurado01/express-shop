import {injectable} from '../../../../shared/decorators/injectable'
import {seedProductCategories} from '../../shared/infra/in-memory-seed'
import {InMemoryRepository} from '../../shared/infra/in-memory.repository'
import {ProductCategoryNotFoundError} from '../domain/product-category-not-found.error'
import {ProductCategoryCriteria, ProductCategoryFilter} from '../domain/product-category.criteria'
import {ProductCategory} from '../domain/product-category.entity'
import {ProductCategoryRepository} from '../domain/product-category.repository'

@injectable()
export class ProductCategoryInMemeoryRepository
  extends InMemoryRepository<ProductCategory, ProductCategoryCriteria>
  implements ProductCategoryRepository
{
  constructor() {
    super()

    this.items = seedProductCategories
  }

  protected applyFilter(filter: ProductCategoryFilter, categories: ProductCategory[]) {
    return categories.filter(item => {
      const id = !filter?.id || item.id === filter.id

      return id
    })
  }

  protected notFound(filter: ProductCategoryFilter) {
    throw new ProductCategoryNotFoundError(filter)
  }
}
